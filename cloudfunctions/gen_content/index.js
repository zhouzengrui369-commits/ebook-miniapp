// 临时云函数：批量生成章节内容
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const https = require('https');

const MaaS_URL = 'https://tokenhub.tencentmaas.com/v1/chat/completions';

function httpPost(url, data) {
  const body = JSON.stringify(data);
  const urlObj = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: urlObj.hostname, path: urlObj.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      timeout: 30000
    }, res => {
      let chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8'))); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', e => reject(e));
    req.write(body); req.end();
  });
}

async function genChapter(title, author, topic) {
  const prompt = `请为《预测之书》电子书的一章撰写内容。由${author}撰写，标题「${title}」，核心主题：${topic}。

严格输出JSON（不要markdown代码块）：
{"summary":"50-80字中文摘要概括核心观点","sentences":["句1","句2","句3","句4","句5","句6","句7","句8"]}

要求：summary精炼有洞见；sentences共8句每句15-50字逻辑连贯由浅入深；语言理性有洞察力；不用"作者认为""本文"等元叙述。`;

  const res = await httpPost(MaaS_URL, {
    model: 'kimi-k3', temperature: 0.7,
    messages: [{ role: 'user', content: prompt }]
  });
  const ct = res.choices[0].message.content.trim();
  let json = ct;
  if (json.startsWith('```')) { json = json.split('\n').slice(1).join('\n'); if (json.endsWith('```')) json = json.slice(0, -3); }
  return JSON.parse(json);
}

// 所有待生成章节
const ALL_CHAPTERS = [
  {id:"ch03",title:"科技的历史就是人类持续解放的历史",author:"何帆",topic:"回顾科技史，每次技术革命都解放了人类的体力和脑力，AI时代是解放的延续"},
  {id:"ch04",title:"科技是社会进步的基石",author:"施展",topic:"科技创新驱动社会制度变革，技术进步与文明演进的关系"},
  {id:"ch05",title:"人类和机器的共生新世界",author:"吴伯凡",topic:"人机共生的未来形态，人类如何与AI建立新型协作关系"},
  {id:"ch06",title:"从摩尔定律到黄氏定律",author:"赵晓",topic:"芯片算力增长规律的变化，AI时代算力需求与供给"},
  {id:"ch07",title:"知识生产的革命",author:"史蒂芬·平克",topic:"AI改变知识创造和传播方式，信息时代的认知革命"},
  {id:"ch08",title:"AI时代的人类价值",author:"薛兆丰",topic:"经济学视角下AI对劳动力市场和人类价值的重新定义"},
  {id:"ch09",title:"工作的未来",author:"丹尼尔·平克",topic:"AI时代工作形态的变革，从全职就业到多元工作模式"},
  {id:"ch10",title:"AI与教育变革",author:"萨尔曼·可汗",topic:"AI重塑教育体系，实现个性化学习和教师的角色转变"},
  {id:"ch11",title:"人工智能的奇点",author:"李开复",topic:"AI奇点是否即将到来，对人类社会意味着什么"},
  {id:"ch12",title:"通用人工智能之路",author:"吴恩达",topic:"从专用AI到通用AI的技术路径与挑战"},
  {id:"ch13",title:"深度学习的未来",author:"杰弗里·辛顿",topic:"深度学习技术的演进方向和潜在突破"},
  {id:"ch14",title:"机器人的黎明",author:"罗德尼·布鲁克斯",topic:"人形机器人与具身智能的发展前景"},
  {id:"ch15",title:"量子计算的前景",author:"潘建伟",topic:"量子计算对AI和科学研究的革命性影响"},
  {id:"ch16",title:"生物技术与长寿",author:"大卫·辛克莱",topic:"基因编辑、抗衰老技术与延长健康寿命的前景"},
  {id:"ch17",title:"脑机接口的突破",author:"米格尔·尼科莱利斯",topic:"脑机接口技术发展及其对人类交互方式的改变"},
  {id:"ch18",title:"气候科技与碳中和",author:"比尔·盖茨",topic:"科技创新应对气候变化，实现碳中和目标"},
  {id:"ch19",title:"太空探索新纪元",author:"克里斯·哈德菲尔德",topic:"商业航天崛起和人类太空探索新阶段"},
  {id:"ch20",title:"能源革命",author:"朱棣文",topic:"新能源技术突破与全球能源格局重塑"},
  {id:"ch21",title:"数字时代的民主",author:"尤瓦尔·赫拉利",topic:"AI和信息技术对民主制度和社会治理的深远影响"},
  {id:"ch22",title:"全球化与逆全球化",author:"托马斯·弗里德曼",topic:"科技发展对全球化的推动与逆全球化浪潮的博弈"},
  {id:"ch23",title:"城市进化论",author:"爱德华·格莱泽",topic:"智慧城市兴起和AI驱动的城市治理新模式"},
  {id:"ch24",title:"经济范式的转移",author:"林毅夫",topic:"AI时代的经济增长模式转变与新产业政策"},
  {id:"ch25",title:"数字货币与金融秩序",author:"周小川",topic:"数字货币、区块链技术与国际金融体系重构"},
  {id:"ch26",title:"社会治理的数字化转型",author:"汪玉凯",topic:"数字技术提升社会治理效率和公共服务质量"},
  {id:"ch27",title:"数据权利与隐私",author:"辛西娅·德沃克",topic:"AI时代数据隐私保护的挑战和技术解决方案"},
  {id:"ch28",title:"平台经济的边界",author:"蔡斯",topic:"平台型企业的社会责任与反垄断治理"},
  {id:"ch29",title:"后真相时代的媒体",author:"安妮·阿普尔鲍姆",topic:"AI生成内容对信息生态和公共舆论的影响"},
  {id:"ch30",title:"教育平权的技术路径",author:"可汗",topic:"技术弥合教育鸿沟，实现优质教育资源的普惠"},
  {id:"ch31",title:"终身学习的新范式",author:"彼得·德鲁克",topic:"AI时代个人持续学习和技能更新的策略与方法"},
  {id:"ch32",title:"创造力与机器的协作",author:"本·施耐德曼",topic:"人机创造力协作的最佳实践和未来方向"},
  {id:"ch33",title:"情绪智能与AI",author:"丹尼尔·戈尔曼",topic:"AI时代情绪智能的重要性及人机情感交互前景"},
  {id:"ch34",title:"数字时代的幸福感",author:"马丁·塞利格曼",topic:"技术发展对心理健康的影响和数字福祉概念"},
  {id:"ch35",title:"创业家的科技伦理",author:"彼得·蒂尔",topic:"科技创新中的伦理边界和创业者的社会责任"},
  {id:"ch36",title:"全球化时代的人才战略",author:"拉兹洛·博克",topic:"AI时代的人才竞争格局和个人职业发展策略"},
  {id:"ch37",title:"数字游民与远程协作",author:"马特·穆伦维格",topic:"分布式工作和数字游民对组织形态的变革"},
  {id:"ch38",title:"身心灵与科技的平衡",author:"杰克·康菲尔德",topic:"在科技高速发展时代保持身心平衡与内在宁静"},
  {id:"ch39",title:"下一代的教育蓝图",author:"肯·罗宾逊",topic:"重新想象教育目标和方式以培养面向未来的人才"},
  {id:"ch40",title:"设计你的未来人生",author:"比尔·伯内特",topic:"运用设计思维规划职业和人生轨迹"},
  {id:"ch41",title:"2025科技大趋势",author:"凯文·凯利",topic:"展望未来几年的关键技术趋势和必然到来的改变"},
  {id:"ch42",title:"元宇宙的落地路径",author:"马修·鲍尔",topic:"元宇宙从概念到应用的实现路径和关键突破"},
  {id:"ch43",title:"2049：未来世界的十个预言",author:"王煜全",topic:"对2049年世界的全景式预测和行动建议"},
];

exports.main = async (event, context) => {
  const { batch } = event;
  const BATCH_SIZE = 8;
  const start = (batch || 0) * BATCH_SIZE;
  const end = Math.min(start + BATCH_SIZE, ALL_CHAPTERS.length);
  const results = {};

  for (let i = start; i < end; i++) {
    const ch = ALL_CHAPTERS[i];
    try {
      const data = await genChapter(ch.title, ch.author, ch.topic);
      results[ch.id] = {
        title: ch.title, author: ch.author,
        summary: data.summary,
        sentences: data.sentences
      };
      console.log(`OK ${ch.id}`);
    } catch(e) {
      results[ch.id] = { error: e.message };
      console.log(`FAIL ${ch.id}: ${e.message}`);
    }
  }

  return {
    batch: batch || 0,
    start, end,
    total: ALL_CHAPTERS.length,
    results
  };
};
