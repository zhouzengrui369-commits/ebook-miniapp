const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    loading: true,
    error: '',
    errorDetail: '',
    indexData: null,
    restoreProgress: false,
    restoreChapterId: '',
    restoreChapterTitle: '',
    restoreSentenceIdx: 0
  },

  onLoad() {
    this.init();
  },

  onShow() {
    // 从阅读页返回时刷新进度
    if (this.data.indexData) {
      this._updateProgress();
    }
  },

  async init() {
    this.setData({ loading: true, error: '', errorDetail: '' });
    try {
      const [indexDataRaw, chapterImages] = await Promise.all([
        api.getIndex(),
        api.getChapterImages()
      ]);
      const indexData = app.normalizeIndex(indexDataRaw);
      app.globalData.chapterImages = chapterImages;
      // 处理摘要片段和进度
      const progress = wx.getStorageSync('ebook_progress') || {};
      const acts = indexData.acts || [];
      for (const act of acts) {
        for (const ch of (act.chapters || [])) {
          if (ch.summary) {
            ch.summarySnippet = ch.summary.replace(/\n/g, ' ').replace(/::\.::·\s*/g, '').substring(0, 40) + '…';
          }
          if (progress.chId === ch.id && progress.idx !== undefined) {
            ch.progress = '已读至第 ' + (progress.idx + 1) + ' 句';
          }
        }
      }
      app.globalData.indexData = indexData;
      this.setData({ indexData, loading: false });

      // 检查恢复进度
      if (progress.chId) {
        let chTitle = progress.chId;
        for (const act of acts) {
          const found = (act.chapters || []).find(c => c.id === progress.chId);
          if (found) { chTitle = found.title; break; }
        }
        this.setData({
          restoreProgress: true,
          restoreChapterId: progress.chId,
          restoreChapterTitle: chTitle,
          restoreSentenceIdx: (progress.idx || 0) + 1
        });
      }
    } catch (e) {
      this.setData({
        loading: false,
        error: '无法连接服务器 ' + app.globalData.server,
        errorDetail: e.message || ''
      });
    }
  },

  loadChapter(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/reader/reader?chId=' + id });
  },

  restoreReading() {
    wx.navigateTo({ url: '/pages/reader/reader?chId=' + this.data.restoreChapterId });
  }
});
