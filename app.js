// 预测之书 - 微信小程序版（CloudBase 版）
App({
  globalData: {
    server: '',
    cloudEnv: 'cloud1-d5gt8hv6d5bf0a620',  // CloudBase 环境 ID
    useCloudAI: true,       // AI 问答走云函数
    useCloudData: true,     // 书籍数据走云函数
    useCloudTTS: true,     // TTS 走云函数
    useCloudImages: false,  // 图片暂走旧 server
    indexData: null,
    chapterImages: null,
    currentChapter: null,
    currentSentenceIdx: 0,
    currentMode: 'sentence',
    ttsState: { playing: false, idx: 0, audio: null, total: 0 },
    fontSizes: ['size-md', 'size-sm', 'size-lg'],
    fontSizeIdx: 0,
    lineSpacings: ['spacing-md', 'spacing-tight', 'spacing-wide'],
    lineSpacingIdx: 0,
    sidebarOpen: false,
    sidebarTab: 'bookmarks',
    noteEditorOpen: false,
    noteEditState: { chId: null, idx: null },
    aiPanelOpen: false,
    aiSettingsModalOpen: false
  },

  onLaunch() {
    // 初始化 CloudBase
    if (wx.cloud) {
      wx.cloud.init({
        env: this.globalData.cloudEnv,
        traceUser: true
      });
      console.log('[CloudBase] 初始化成功，环境:', this.globalData.cloudEnv);
    } else {
      console.warn('[CloudBase] wx.cloud 不可用，降级使用旧 server');
    }

    // 启用调试模式，真机上绕过域名白名单校验
    wx.setEnableDebug({ enableDebug: true });

    // 恢复暗色模式
    const dark = wx.getStorageSync('ebook_dark');
    if (dark === '1') {
      this.globalData.isDark = true;
    }
    // 恢复阅读偏好
    const prefs = wx.getStorageSync('ebook_prefs') || {};
    if (prefs.fontSize !== undefined) this.globalData.fontSizeIdx = prefs.fontSize;
    if (prefs.lineSpacing !== undefined) this.globalData.lineSpacingIdx = prefs.lineSpacing;
    if (prefs.readMode) this.globalData.currentMode = prefs.readMode;
  },

  normalizeIndex(data) {
    if (!data.acts || !data.acts.length) return data;
    const first = data.acts[0];
    if (first.chapters !== undefined) return data;
    const grouped = {};
    for (const ch of data.acts) {
      const actKey = ch.act || 0;
      if (!grouped[actKey]) {
        grouped[actKey] = { name: ch.act_name || ('第' + actKey + '幕'), chapters: [] };
      }
      grouped[actKey].chapters.push(ch);
    }
    const sortedActs = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b)).map(k => grouped[k]);
    return { title: data.title, editor: data.editor, total_chapters: data.acts.length, acts: sortedActs };
  }
});
