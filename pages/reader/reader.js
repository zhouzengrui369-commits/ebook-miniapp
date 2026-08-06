const api = require('../../utils/api');
const app = getApp();

Page({
  data: {
    chapter: null,
    loading: true,
    fontSizeClass: 'size-md',
    lineSpacingClass: 'spacing-md',
    isDark: false,
    currentMode: 'sentence',
    sentences: [],
    paragraphs: [],
    scrollTop: 0,
    images: [],
    imgBaseUrl: '',
    cleanSummary: '',
    // TTS
    ttsBarVisible: false,
    ttsProgressPercent: 0,
    ttsIdx: 0,
    ttsTotal: 0,
    ttsPlaying: false,
    ttsPreview: '',
    // 书签/笔记
    bookmarkSet: [],
    noteIdxSet: [],
    sidebarOpen: false,
    sidebarTab: 'bookmarks',
    bookmarkList: [],
    noteList: [],
    swipedKey: '',
    // 操作菜单
    actionSheetOpen: false,
    actionSheetText: '',
    actionSheetBookmarked: false,
    actionSheetHasNote: false,
    actionSheetSelectedIdx: -1,
    // 笔记编辑器
    noteEditorOpen: false,
    noteEditIdx: 0,
    noteEditText: '',
    noteEditContent: '',
    // AI 面板
    aiPanelOpen: false,
    aiInputValue: '',
    aiResponse: '',
    aiLoading: false,
    // Toast
    toastVisible: false,
    toastMsg: ''
  },

  onLoad(options) {
    const chId = options.chId || 'ch01';
    // 恢复偏好
    const dark = wx.getStorageSync('ebook_dark') === '1';
    const prefs = wx.getStorageSync('ebook_prefs') || {};
    const fontSizeIdx = prefs.fontSize !== undefined ? prefs.fontSize : 0;
    const lineSpacingIdx = prefs.lineSpacing !== undefined ? prefs.lineSpacing : 0;
    const currentMode = prefs.readMode || 'sentence';

    const fontSizeClasses = ['size-md', 'size-sm', 'size-lg'];
    const lineSpacingClasses = ['spacing-md', 'spacing-tight', 'spacing-wide'];

    this.chId = chId;
    this.setData({
      isDark: dark,
      fontSizeClass: fontSizeClasses[fontSizeIdx] || 'size-md',
      lineSpacingClass: lineSpacingClasses[lineSpacingIdx] || 'spacing-md',
      currentMode: currentMode
    });
    this.loadChapter(chId);
  },

  onHide() {
    // 暂停 TTS 但不销毁，返回时恢复
    if (this._ttsAudio && this.data.ttsPlaying) {
      try { this._ttsAudio.pause(); } catch (e) { }
    }
    this._saveProgress();
  },

  onShow() {
    // 恢复 TTS 播放
    if (this.chId) {
      this._refreshBookmarksAndNotes();
      if (this._ttsAudio && this.data.ttsPlaying) {
        try { this._ttsAudio.play(); } catch (e) { }
      }
    }
  },

  onUnload() {
    this._stopTTS();
    this._saveProgress();
  },

  // ==================== 数据加载 ====================
  async loadChapter(chId) {
    this.setData({ loading: true });
    try {
      const data = await api.getChapter(chId);
      const images = (app.globalData.chapterImages || {})[chId] || [];
      const sentences = data.sentences || [];
      const paragraphs = this._buildParagraphs(sentences);
      const cleanSummary = (data.summary || '').replace(/::\.::·\s*/g, ' ').replace(/\n/g, ' ').trim().replace(/\s+/g, ' ');
      const cloudEnv = app.globalData.cloudEnv;
      const imgBaseUrl = cloudEnv ? `https://${cloudEnv}.tcb.qcloud.la/images` : '';

      this.setData({
        chapter: { title: data.title, author: data.author },
        sentences,
        paragraphs,
        images,
        imgBaseUrl,
        cleanSummary,
        loading: false
      });

      // 恢复进度
      const progress = wx.getStorageSync('ebook_progress') || {};
      if (progress.chId === chId && sentences.length > 0) {
        const idx = Math.min(progress.idx || 0, sentences.length - 1);
        this.setData({ ttsIdx: idx, ttsTotal: sentences.length });
      } else {
        this.setData({ ttsTotal: sentences.length });
      }

      // 加载书签笔记
      this._refreshBookmarksAndNotes();
    } catch (e) {
      this.setData({ loading: false });
      this._toast('加载章节失败: ' + (e.message || '网络错误'));
    }
  },

  _buildParagraphs(sentences) {
    const result = [];
    let start = 0;
    for (let i = 0; i < sentences.length; i++) {
      const isBreak = !sentences[i] || sentences[i].trim() === '';
      if (isBreak && i > start) {
        result.push({ start, end: i });
        start = i + 1;
      } else if (isBreak) {
        start = i + 1;
      }
    }
    if (start < sentences.length) {
      result.push({ start, end: sentences.length });
    }
    return result;
  },

  // ==================== 书签/笔记存储 ====================
  _getBMStore() {
    return wx.getStorageSync('ebook_bookmarks') || {};
  },
  _setBMStore(data) {
    wx.setStorageSync('ebook_bookmarks', data);
  },
  _getNoteStore() {
    return wx.getStorageSync('ebook_notes') || {};
  },
  _setNoteStore(data) {
    wx.setStorageSync('ebook_notes', data);
  },

  _refreshBookmarksAndNotes() {
    const chId = this.chId;
    const bmStore = this._getBMStore();
    const noteStore = this._getNoteStore();
    const bmList = bmStore[chId] || [];
    const noteList = noteStore[chId] || [];

    const bookmarkSet = bmList.map(b => b.idx);
    const noteIdxSet = noteList.map(n => n.idx);

    this.setData({ bookmarkSet, noteIdxSet, bookmarkList: bmList, noteList });
  },

  // ==================== 进度 ====================
  _saveProgress() {
    if (!this.chId) return;
    wx.setStorageSync('ebook_progress', { chId: this.chId, idx: this.data.ttsIdx });
  },

  // ==================== 导航 ====================
  backToTOC() {
    wx.navigateBack();
  },

  // ==================== 显示设置 ====================
  cycleFontSize() {
    const classes = ['size-md', 'size-sm', 'size-lg'];
    const cur = this.data.fontSizeClass;
    const idx = classes.indexOf(cur);
    const next = (idx + 1) % classes.length;
    this.setData({ fontSizeClass: classes[next] });
    // 存储偏好
    const prefs = wx.getStorageSync('ebook_prefs') || {};
    prefs.fontSize = next;
    wx.setStorageSync('ebook_prefs', prefs);
  },

  cycleLineSpacing() {
    const classes = ['spacing-md', 'spacing-tight', 'spacing-wide'];
    const cur = this.data.lineSpacingClass;
    const idx = classes.indexOf(cur);
    const next = (idx + 1) % classes.length;
    this.setData({ lineSpacingClass: classes[next] });
    const prefs = wx.getStorageSync('ebook_prefs') || {};
    prefs.lineSpacing = next;
    wx.setStorageSync('ebook_prefs', prefs);
  },

  toggleDark() {
    const next = !this.data.isDark;
    this.setData({ isDark: next });
    wx.setStorageSync('ebook_dark', next ? '1' : '0');
  },

  // ==================== 模式切换 ====================
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ currentMode: mode });
    const prefs = wx.getStorageSync('ebook_prefs') || {};
    prefs.readMode = mode;
    wx.setStorageSync('ebook_prefs', prefs);
  },

  // ==================== 滚动 ====================
  onScroll(e) {
    this._lastScrollTop = e.detail.scrollTop;
  },

  // ==================== 图片预览 ====================
  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    const urls = (this.data.images || []).map(img => this.data.imgBaseUrl + '/' + img);
    wx.previewImage({ urls, current: src });
  },

  // ==================== TTS ====================
  ttsToggle() {
    if (this.data.ttsPlaying) {
      this._stopTTS();
    } else {
      this._startTTS();
    }
  },

  _startTTS() {
    // 播放到末尾时从头开始
    if (this.data.ttsIdx >= this.data.sentences.length) {
      this.setData({ ttsIdx: 0 });
    }
    this.setData({ ttsPlaying: true, ttsBarVisible: true });
    this._ttsCache = {};  // 重置预取缓存
    this._ttsInterrupted = false;
    this._ttsSpeaking = false;
    this._speakId = 0;  // 竞态防护计数器
    try { wx.setKeepScreenOn({ keepScreenOn: true }); } catch (e) { }

    // 复用单个 InnerAudioContext，避免频繁 create/destroy 触达微信实例数上限
    if (!this._ttsAudio) {
      const audio = wx.createInnerAudioContext();
      this._ttsAudio = audio;

      audio.onEnded(() => {
        if (this._ttsInterrupted || !this.data.ttsPlaying) return;
        const nextIdx = this.data.ttsIdx + 1;
        if (nextIdx >= this.data.sentences.length) { this._stopTTS(); return; }
        this.data.ttsIdx = nextIdx;
        this._speakCurrent();
        this.setData({ ttsIdx: nextIdx });
      });

      audio.onError((err) => {
        console.warn('[TTS] audio error:', err);
        if (this._ttsInterrupted || !this.data.ttsPlaying) return;
        const nextIdx = this.data.ttsIdx + 1;
        if (nextIdx >= this.data.sentences.length) { this._stopTTS(); return; }
        this.data.ttsIdx = nextIdx;
        setTimeout(() => { this._speakCurrent(); }, 300);
        this.setData({ ttsIdx: nextIdx });
      });
    }

    this._speakCurrent();
  },

  _stopTTS() {
    this._ttsInterrupted = true;
    this._ttsSpeaking = false;
    this._ttsCache = {};
    this.setData({ ttsPlaying: false });
    try { wx.setKeepScreenOn({ keepScreenOn: false }); } catch (e) { }
    if (this._ttsAudio) {
      try { this._ttsAudio.stop(); this._ttsAudio.destroy(); } catch (e) { }
      this._ttsAudio = null;
    }
  },

  // 滚动到当前高亮句
  _scrollToSentence(idx) {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#sent-' + idx).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      if (!res[0] || !res[1]) return;
      const rect = res[0];
      const targetScrollTop = rect.top + (that._lastScrollTop || 0) - 150;
      that.setData({ scrollTop: targetScrollTop });
    });
  },

  async _speakCurrent() {
    if (!this.data.ttsPlaying || this._ttsInterrupted) return;
    const idx = this.data.ttsIdx;
    const sentences = this.data.sentences;
    if (!sentences || idx >= sentences.length) { this._stopTTS(); return; }

    const text = sentences[idx];
    if (!text || text.trim().length === 0) {
      this.data.ttsIdx = idx + 1;
      this._saveProgress();
      this._speakCurrent();
      return;
    }

    // 竞态防护：每次进入递增 speakId，await 后比对确保不处理过时响应
    const speakId = ++this._speakId;

    this.setData({
      ttsPreview: text.length > 30 ? text.substring(0, 30) + '…' : text,
      ttsProgressPercent: sentences.length > 0 ? Math.round(((idx + 1) / sentences.length) * 100) : 0
    });
    this._saveProgress();

    // 滚动到当前高亮句
    this._scrollToSentence(idx);

    // 优先使用预取缓存
    let url = this._ttsCache ? this._ttsCache[idx] : null;
    if (url) delete this._ttsCache[idx];

    if (!url) {
      try {
        const ttsResult = await api.callFunction('tts', { text });
        // 竞态检查：await 期间可能已被新调用覆盖
        if (this._speakId !== speakId || this._ttsInterrupted || !this.data.ttsPlaying) return;
        if (ttsResult.url && !ttsResult.error) {
          url = ttsResult.url;
        } else {
          wx.showToast({ title: ttsResult.error || 'TTS 服务异常', icon: 'none', duration: 3000 });
        }
      } catch (e) {
        if (this._speakId !== speakId || this._ttsInterrupted || !this.data.ttsPlaying) return;
        wx.showToast({ title: 'TTS 云函数调用失败: ' + (e.message || '网络错误'), icon: 'none', duration: 3000 });
      }
    }

    // 二次竞态检查
    if (this._speakId !== speakId || !url || this._ttsInterrupted || !this.data.ttsPlaying) {
      this._stopTTS();
      return;
    }

    // 复用 InnerAudioContext：先停止当前播放，再设置新 src
    if (!this._ttsAudio) {
      this._startTTS();
      return;
    }

    try { this._ttsAudio.stop(); } catch (e) { }
    this._ttsAudio.src = url;
    this._ttsAudio.play();

    // 当前句开始播放后，立即预取后续多句
    this._prefetchAhead(idx + 1);
  },

  // 并行预取后续 N 句 TTS 音频，消除连续播放间隔
  _prefetchAhead(startIdx) {
    const sentences = this.data.sentences;
    if (!sentences) return;
    if (!this._ttsCache) this._ttsCache = {};

    // 每个句子独立发起请求，并行执行
    const fetchOne = async (idx) => {
      if (idx >= sentences.length) return;
      const text = sentences[idx];
      if (!text || text.trim().length === 0) {
        fetchOne(idx + 1); // 跳过空句继续
        return;
      }
      if (this._ttsCache[idx]) return;
      try {
        const ttsResult = await api.callFunction('tts', { text });
        if (ttsResult.url && !ttsResult.error && this._ttsCache) {
          this._ttsCache[idx] = ttsResult.url;
        }
      } catch (e) { /* 静默失败，播放时按需获取 */ }
    };

    // 并行预取 3 句（当前句的下 1/2/3 句）
    for (let i = 0; i < 3; i++) {
      fetchOne(startIdx + i);
    }
  },
  ttsSeek(e) {
    const idx = parseInt(e.detail.value) - 1;
    if (idx >= 0 && idx < this.data.sentences.length) {
      this._ttsCache = {};
      this.setData({ ttsIdx: idx });
      if (this.data.ttsPlaying) this._speakCurrent();
    }
  },

  ttsPrev() {
    const idx = Math.max(0, this.data.ttsIdx - 1);
    this._ttsCache = {};
    this.setData({ ttsIdx: idx });
    if (this.data.ttsPlaying) this._speakCurrent();
  },

  ttsNext() {
    const idx = Math.min(this.data.sentences.length - 1, this.data.ttsIdx + 1);
    this._ttsCache = {};
    this.setData({ ttsIdx: idx });
    if (this.data.ttsPlaying) this._speakCurrent();
  },

  ttsStop() {
    this._stopTTS();
    this.setData({ ttsIdx: 0, ttsProgressPercent: 0 });
    this._saveProgress();
  },

  // ==================== 侧边栏：书签/笔记 ====================
  toggleSidebar(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      sidebarOpen: !this.data.sidebarOpen || this.data.sidebarTab !== tab ? true : !this.data.sidebarOpen,
      sidebarTab: tab
    });
  },

  closeSidebar() {
    this.setData({ sidebarOpen: false });
  },

  switchSidebarTab(e) {
    this.setData({ sidebarTab: e.currentTarget.dataset.tab });
  },

  // ==================== 书签操作 ====================
  _toggleBookmark(idx, text) {
    const chId = this.chId;
    const store = this._getBMStore();
    const list = store[chId] || [];

    const existIdx = list.findIndex(b => b.idx === idx);
    if (existIdx >= 0) {
      list.splice(existIdx, 1);
      if (list.length === 0) delete store[chId];
    } else {
      list.push({
        key: 'bm_' + Date.now(),
        idx,
        chTitle: this.data.chapter ? this.data.chapter.title : '',
        text
      });
      store[chId] = list;
    }
    this._setBMStore(store);
    this._refreshBookmarksAndNotes();
  },

  removeBookmarkItem(e) {
    const key = e.currentTarget.dataset.key;
    const chId = this.chId;
    const store = this._getBMStore();
    const list = (store[chId] || []).filter(b => b.key !== key);
    if (list.length === 0) delete store[chId];
    else store[chId] = list;
    this._setBMStore(store);
    this._refreshBookmarksAndNotes();
  },

  jumpToSentence(e) {
    const idx = parseInt(e.currentTarget.dataset.idx);
    if (!isNaN(idx) && idx >= 0 && idx < this.data.sentences.length) {
      this.setData({ ttsIdx: idx, sidebarOpen: false });
    }
  },

  // ==================== 笔记操作 ====================
  removeNoteItem(e) {
    const key = e.currentTarget.dataset.key;
    const chId = this.chId;
    const store = this._getNoteStore();
    const list = (store[chId] || []).filter(n => n.key !== key);
    if (list.length === 0) delete store[chId];
    else store[chId] = list;
    this._setNoteStore(store);
    this._refreshBookmarksAndNotes();
  },

  // ==================== 点击/长按句子 ====================
  onSentenceTap(e) {
    const idx = e.currentTarget.dataset.idx;
    if (this.data.ttsPlaying && this.data.ttsIdx === idx) {
      // 点击当前播放句 → 暂停
      this._stopTTS();
    } else if (this.data.ttsPlaying) {
      // 正在播放其他句 → 跳转到该句继续播放
      this._ttsCache = {};
      this.data.ttsIdx = idx;
      this.setData({ ttsIdx: idx });
      this._speakCurrent();
      this._saveProgress();
    } else {
      // 未播放 → 从该句开始播放
      this.data.ttsIdx = idx;
      this.setData({ ttsIdx: idx, ttsBarVisible: true });
      this._startTTS();
      this._saveProgress();
    }
  },

  onContinuousTap(e) {
    const idx = e.currentTarget.dataset.idx;
    if (this.data.ttsPlaying && this.data.ttsIdx === idx) {
      this._stopTTS();
    } else if (this.data.ttsPlaying) {
      this._ttsCache = {};
      this.data.ttsIdx = idx;
      this.setData({ ttsIdx: idx });
      this._speakCurrent();
      this._saveProgress();
    } else {
      this.data.ttsIdx = idx;
      this.setData({ ttsIdx: idx, ttsBarVisible: true });
      this._startTTS();
      this._saveProgress();
    }
  },

  onSentenceLongPress(e) {
    const idx = e.currentTarget.dataset.idx;
    const text = this.data.sentences[idx] || '';
    const isBookmarked = (this.data.bookmarkSet || []).includes(idx);
    const hasNote = (this.data.noteIdxSet || []).includes(idx);

    this.setData({
      actionSheetOpen: true,
      actionSheetText: text.length > 50 ? text.substring(0, 50) + '…' : text,
      actionSheetBookmarked: isBookmarked,
      actionSheetHasNote: hasNote,
      actionSheetSelectedIdx: idx
    });
  },

  // ==================== ActionSheet ====================
  closeActionSheet() {
    this.setData({ actionSheetOpen: false });
  },

  actionSheetBookmark() {
    const idx = this.data.actionSheetSelectedIdx;
    const text = this.data.sentences[idx] || '';
    this._toggleBookmark(idx, text);
    this.setData({ actionSheetOpen: false });
  },

  actionSheetNote() {
    const idx = this.data.actionSheetSelectedIdx;
    const text = this.data.sentences[idx] || '';

    // 加载已有笔记
    const noteStore = this._getNoteStore();
    const list = (noteStore[this.chId] || []);
    const existing = list.find(n => n.idx === idx);
    this.setData({
      actionSheetOpen: false,
      noteEditorOpen: true,
      noteEditIdx: idx,
      noteEditText: text,
      noteEditContent: existing ? existing.note : ''
    });
  },

  actionSheetAI() {
    const idx = this.data.actionSheetSelectedIdx;
    const text = this.data.sentences[idx] || '';
    this.setData({
      actionSheetOpen: false,
      aiPanelOpen: true,
      aiInputValue: text
    });
  },

  // ==================== 笔记编辑器 ====================
  closeNoteEditor() {
    this.setData({ noteEditorOpen: false });
  },

  onNoteInput(e) {
    this.setData({ noteEditContent: e.detail.value });
  },

  saveNote() {
    const noteText = (this.data.noteEditContent || '').trim();
    if (!noteText) {
      this._toast('请输入笔记内容');
      return;
    }
    const chId = this.chId;
    const store = this._getNoteStore();
    const list = store[chId] || [];

    const existIdx = list.findIndex(n => n.idx === this.data.noteEditIdx);
    const chTitle = this.data.chapter ? this.data.chapter.title : '';
    const noteItem = {
      key: 'note_' + Date.now(),
      idx: this.data.noteEditIdx,
      chTitle,
      text: this.data.noteEditText,
      note: noteText,
      preview: noteText.length > 20 ? noteText.substring(0, 20) + '…' : noteText
    };

    if (existIdx >= 0) {
      list[existIdx] = noteItem;
    } else {
      list.push(noteItem);
    }
    store[chId] = list;
    this._setNoteStore(store);
    this._refreshBookmarksAndNotes();
    this.setData({ noteEditorOpen: false });
    this._toast('笔记已保存');
  },

  // ==================== 滑动删除 ====================
  onSwipeStart(e) {
    this._swipeX = e.touches[0].clientX;
  },

  onSwipeMove(e) {
    if (!this._swipeX) return;
    const dx = e.touches[0].clientX - this._swipeX;
    const key = e.currentTarget.dataset.key;
    if (dx < -40) {
      this.setData({ swipedKey: key });
    } else if (dx > 40) {
      this.setData({ swipedKey: '' });
    }
  },

  onSwipeEnd() {
    this._swipeX = null;
  },

  // ==================== AI 面板 ====================
  toggleAIPanel() {
    this.setData({ aiPanelOpen: !this.data.aiPanelOpen });
  },

  onAIInput(e) {
    this.setData({ aiInputValue: e.detail.value });
  },

  async aiAsk() {
    const question = (this.data.aiInputValue || '').trim();
    if (!question || this.data.aiLoading) return;
    this.setData({ aiInputValue: '', aiLoading: true, aiResponse: '' });

    const chapter = this.data.chapter || {};
    const sentences = this.data.sentences || [];
    const chapterContext = sentences.join('').replace(/\s+/g, ' ').substring(0, 3000);

    try {
      const result = await api.askAI(
        question,
        chapter.title || '',
        chapter.author || '',
        chapterContext
      );

      if (result && result.reply) {
        this.setData({ aiResponse: result.reply, aiLoading: false });
      } else if (result && result.error) {
        console.warn('[AI] 云函数返回错误:', result.error);
        this.setData({ aiResponse: 'AI 服务暂不可用，请检查云函数是否已部署', aiLoading: false });
      } else {
        this.setData({ aiResponse: 'AI 返回异常，请稍后重试', aiLoading: false });
      }
    } catch (e) {
      console.warn('[AI] 云函数调用失败:', e.message);
      this.setData({ aiResponse: 'AI 服务暂不可用，请检查云函数是否已部署', aiLoading: false });
    }
  },

  // ==================== Toast ====================
  _toast(msg) {
    this.setData({ toastVisible: true, toastMsg: msg });
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.setData({ toastVisible: false });
    }, 2000);
  }
});
