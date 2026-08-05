// 预测之书 AI 问答云函数
// 调用 TokenHub API（腾讯混元/DeepSeek 等模型，OpenAI 兼容）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const https = require('https');

const TOKENHUB_URL = 'https://tokenhub.tencentmaas.com/v1/chat/completions';
const MODEL = 'kimi-k3';

exports.main = async (event, context) => {
  const { question, chapter_title, chapter_author, chapter_context } = event;

  if (!question || !question.trim()) {
    return { error: '请提供问题' };
  }

  const apiKey = process.env.TOKENHUB_API_KEY;
  if (!apiKey) {
    return { error: 'TokenHub API Key 未配置 (TOKENHUB_API_KEY)' };
  }

  const systemPrompt = [
    '你是《预测之书》的AI导读助手。请基于提供的章节内容回答读者问题。',
    '- 回答简洁，不超过200字',
    '- 优先基于章节内容，可适当拓展背景知识',
    '- 语气平实，像一位博学的朋友在聊天',
    chapter_title ? `当前章节：${chapter_title}` : '',
    chapter_author ? `作者：${chapter_author}` : ''
  ].filter(Boolean).join('\n');

  const userContent = chapter_context
    ? `章节内容摘要：\n${chapter_context}\n\n读者问题：${question}`
    : question;

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent }
    ],
    temperature: 1,
    max_tokens: 500
  });

  // --- 调试日志：请求信息 ---
  console.log('=== TokenHub API 请求调试 ===');
  console.log(`TOKENHUB_API_KEY 前8=${apiKey.slice(0, 8)}, 后4=${apiKey.slice(-4)}`);
  console.log('完整请求URL:', TOKENHUB_URL);
  console.log('请求Headers:', JSON.stringify({
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Authorization': `Bearer ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`
  }));
  console.log('请求Body:', body);
  console.log('=============================');

  return new Promise((resolve) => {
    const urlObj = new URL(TOKENHUB_URL);
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 30000
    }, (res) => {
      let chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        try {
          const rawBody = Buffer.concat(chunks).toString('utf-8');
          console.log('API返回完整Response Body:', rawBody);
          const result = JSON.parse(rawBody);
          if (result.error) {
            resolve({ error: result.error.message || 'TokenHub API 错误' });
            return;
          }
          const reply = result.choices && result.choices[0] && result.choices[0].message
            ? result.choices[0].message.content
            : '未能获取回复';
          resolve({ reply });
        } catch (e) {
          resolve({ error: '解析响应失败: ' + e.message });
        }
      });
    });
    req.on('error', e => resolve({ error: 'AI 服务暂时不可用: ' + (e.message || '网络错误') }));
    req.on('timeout', () => { req.destroy(); resolve({ error: '请求超时' }); });
    req.write(body);
    req.end();
  });
};
