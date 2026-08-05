// 预测之书 TTS 云函数 - Edge TTS with DRM (Sec-MS-GEC)
// 基于 edge-tts Python v7.2.8 协议逆向
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const crypto = require('crypto');
const WebSocket = require('ws');

// ==================== 常量（来自 edge-tts v7.2.8） ====================
const WSS_URL = 'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1';
const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const SEC_MS_GEC_VERSION = '1-143.0.3650.75';
const WIN_EPOCH = 11644473600;

const WSS_HEADERS = {
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Accept-Language': 'en-US,en;q=0.9',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
};

let clockSkewSeconds = 0;

// ==================== DRM token 生成 ====================
function generateMuid() {
  return crypto.randomBytes(16).toString('hex').toUpperCase();
}

function generateSecMsGec() {
  // unix timestamp + clock skew → Windows file time → round to 5min → 100ns intervals → SHA256
  let ticks = Math.floor(Date.now() / 1000) + clockSkewSeconds;
  ticks += WIN_EPOCH;
  ticks = Math.floor(ticks / 300) * 300;
  ticks = ticks * 1e7;
  const strToHash = `${Math.floor(ticks)}${TRUSTED_CLIENT_TOKEN}`;
  return crypto.createHash('sha256').update(strToHash).digest('hex').toUpperCase();
}

function adjustClockSkew(dateHeader) {
  try {
    const serverTime = new Date(dateHeader).getTime() / 1000;
    if (!isNaN(serverTime)) {
      const clientTime = Date.now() / 1000;
      clockSkewSeconds += (serverTime - clientTime);
      console.log('Clock skew adjusted:', clockSkewSeconds.toFixed(3));
    }
  } catch (e) { /* ignore */ }
}

// ==================== SSML 构建 ====================
function buildSSML(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='zh-CN'>` +
    `<voice name='zh-CN-XiaoxiaoNeural'><prosody rate='-10%' pitch='+5Hz'>${escaped}</prosody></voice></speak>`;
}

// ==================== Edge TTS 主函数 ====================
function edgeTTS(text) {
  return new Promise((resolve, reject) => {
    const connectId = crypto.randomUUID();
    const secMsGec = generateSecMsGec();
    const muid = generateMuid();

    const wsUrl = `${WSS_URL}?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}` +
      `&ConnectionId=${connectId}` +
      `&Sec-MS-GEC=${secMsGec}` +
      `&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}`;

    const headers = { ...WSS_HEADERS, 'X-MUID': muid };
    const ws = new WebSocket(wsUrl, { headers });

    const requestId = crypto.randomUUID();
    const timestamp = new Date().toUTCString();
    let audioChunks = [];
    let handshakeDone = false;
    let timeout = setTimeout(() => { ws.close(); reject(new Error('Edge TTS timeout')); }, 15000);

    ws.on('open', () => {
      // 发送 speech.config
      ws.send(`X-Timestamp:${timestamp}\r\n` +
        'Content-Type:application/json; charset=utf-8\r\n' +
        'Path:speech.config\r\n\r\n' +
        '{"context":{"synthesis":{"audio":{"metadataoptions":{' +
        '"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},' +
        '"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}');

      // 发送 SSML
      ws.send(`X-RequestId:${requestId}\r\n` +
        `X-Timestamp:${timestamp}\r\n` +
        'Content-Type:application/ssml+xml\r\n' +
        'Path:ssml\r\n\r\n' +
        buildSSML(text));
    });

    ws.on('message', (data) => {
      try {
        // Edge TTS sends ALL messages as binary (even text metadata)
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
        const headStr = buf.toString('ascii', 0, Math.min(300, buf.length));

        if (headStr.includes('Path:turn.start')) {
          handshakeDone = true;
          clearTimeout(timeout);
          return;
        }
        if (headStr.includes('Path:turn.end')) {
          ws.close();
          return;
        }
        if (handshakeDone) {
          const headerEnd = buf.indexOf(':audio\r\n');
          if (headerEnd > 0 && buf.length > headerEnd + 8) {
            audioChunks.push(buf.slice(headerEnd + 8));
          }
        }
      } catch (e) { /* ignore */ }
    });

    ws.on('close', () => {
      clearTimeout(timeout);
      if (audioChunks.length > 0) {
        resolve(Buffer.concat(audioChunks));
      } else {
        reject(new Error('Edge TTS: no audio received'));
      }
    });

    ws.on('error', (e) => {
      clearTimeout(timeout);
      reject(new Error('Edge TTS error: ' + e.message));
    });

    ws.on('unexpected-response', (req, res) => {
      clearTimeout(timeout);
      // 403 → 提取 Date 头调整时钟偏差 → 重试
      if (res.statusCode === 403) {
        const dateHeader = res.headers['date'];
        if (dateHeader) {
          adjustClockSkew(dateHeader);
          edgeTTS(text).then(resolve).catch(reject);
          return;
        }
      }
      reject(new Error(`Edge TTS HTTP ${res.statusCode}`));
    });
  });
}

// ==================== 主入口 ====================
exports.main = async (event, context) => {
  const { text } = event;
  if (!text || !text.trim()) return { error: '请提供合成文本' };

  const cleanText = text.trim();
  let audioBuffer = null;

  try {
    audioBuffer = await edgeTTS(cleanText);
    console.log('Edge TTS success, size:', audioBuffer.length);
  } catch (e) {
    console.error('Edge TTS failed:', e.message);
    return { error: 'TTS 合成失败，请稍后重试' };
  }

  // 上传到云存储
  try {
    const cloudPath = `tts/${Date.now()}_${crypto.randomBytes(4).toString('hex')}.mp3`;
    const uploadResult = await cloud.uploadFile({ cloudPath, fileContent: audioBuffer });
    const tempResult = await cloud.getTempFileURL({ fileList: [uploadResult.fileID] });
    return { url: tempResult.fileList[0].tempFileURL, fileID: uploadResult.fileID };
  } catch (e) {
    console.error('Upload error:', e);
    return { error: '音频上传失败: ' + (e.message || '未知错误') };
  }
};
