const BookmarkManager = {
  KEY: 'r1zzz_bookmarks',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; }
  },

  isBookmarked(surahNo, ayatNo) {
    return this.getAll().some(b => Number(b.surahNo) === Number(surahNo) && Number(b.ayatNo) === Number(ayatNo));
  },

  toggle(bookmarkItem) {
    let bookmarks = this.getAll();
    const index = bookmarks.findIndex(b => Number(b.surahNo) === Number(bookmarkItem.surahNo) && Number(b.ayatNo) === Number(bookmarkItem.ayatNo));

    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(bookmarkItem);
    }

    localStorage.setItem(this.KEY, JSON.stringify(bookmarks));
  }
};

function toggleBookmark(surahNo, ayatNo, surahName, teksArab) {
  BookmarkManager.toggle({ surahNo, ayatNo, surahName, teksArab });
  
  const btn = document.querySelector(`.bookmark-btn-${surahNo}-${ayatNo}`);
  if (btn) {
    btn.classList.toggle('active', BookmarkManager.isBookmarked(surahNo, ayatNo));
  }

  if (window.location.hash === '#bookmark') {
    renderBookmarkView();
  }
}