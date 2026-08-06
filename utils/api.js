// 网络请求封装 - CloudBase 云函数 + HTTP 双模态
const app = getApp();

// 数据缓存（避免重复请求）
let _indexCache = null;
let _chapterImagesCache = null;
let _chapterCache = {};

// === CloudBase 云函数调用 ===
function callFunction(name, data) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success(res) {
        resolve(res.result);
      },
      fail(err) {
        reject(new Error('云函数调用失败: ' + (err.errMsg || '未知错误')));
      }
    });
  });
}

// === 数据接口 ===
function getIndex() {
  if (_indexCache) return Promise.resolve(_indexCache);
  return callFunction('get_data', { action: 'index' }).then(data => {
    _indexCache = data.data || data;
    return _indexCache;
  });
}

function getChapterImages() {
  if (_chapterImagesCache) return Promise.resolve(_chapterImagesCache);
  return callFunction('get_data', { action: 'chapter_images' }).then(data => {
    _chapterImagesCache = data.data || data;
    return _chapterImagesCache;
  });
}

function getChapter(id) {
  if (_chapterCache[id]) return Promise.resolve(_chapterCache[id]);
  return callFunction('get_data', { action: 'chapter', chId: id }).then(data => {
    _chapterCache[id] = data.data || data;
    return _chapterCache[id];
  });
}

// === TTS 接口 ===
async function getTTSUrl(text) {
  if (app.globalData.useCloudTTS) {
    const result = await callFunction('tts', { text });
    return result.url;
  }
  // 降级为旧版 server（如 Cloudflare tunnel 仍可用）
  return (app.globalData.server || '') + '/tts?text=' + encodeURIComponent(text);
}

// === 图片地址 ===
function getImageUrl(imgName) {
  // 优先从云存储获取
  const env = app.globalData.cloudEnv;
  if (env && app.globalData.useCloudImages) {
    return `https://${env}.tcb.qcloud.la/images/${imgName}`;
  }
  // 旧 server 已失效，云存储图片暂不可用时返回空字符串
  return '';
}

// === HTTP 请求（保留旧接口兼容） ===
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    const fullUrl = app.globalData.server + url;
    wx.request({
      url: fullUrl,
      method: method || 'GET',
      data: data || null,
      timeout: 10000,
      header: { 'Content-Type': 'application/json' },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error('请求失败: ' + res.statusCode));
        }
      },
      fail(err) {
        reject(new Error('网络请求失败: ' + (err.errMsg || '未知错误')));
      }
    });
  });
}

// === AI 问答 ===
function askAI(question, chapterTitle, chapterAuthor, chapterContext) {
  return callFunction('ai_qa', {
    question,
    chapter_title: chapterTitle,
    chapter_author: chapterAuthor,
    chapter_context: chapterContext
  });
}

module.exports = {
  request,
  getIndex,
  getChapterImages,
  getChapter,
  getTTSUrl,
  getImageUrl,
  askAI,
  callFunction
};
