const LastReadManager = {
  KEY: 'r1zzz_last_read',

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)); } catch (e) { return null; }
  },

  set(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
};