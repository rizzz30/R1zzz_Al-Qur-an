const NotesManager = {
  KEY: 'r1zzz_personal_notes',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch (e) { return {}; }
  },

  get(surahNo, ayatNo) {
    const notes = this.getAll();
    return notes[`${surahNo}-${ayatNo}`] || '';
  },

  save(surahNo, ayatNo, text, surahName, teksArab) {
    const notes = this.getAll();
    const key = `${surahNo}-${ayatNo}`;
    if (text.trim() === '') {
      delete notes[key];
    } else {
      notes[key] = {
        surahNo,
        ayatNo,
        surahName,
        teksArab,
        text,
        date: new Date().toLocaleDateString('id-ID')
      };
    }
    localStorage.setItem(this.KEY, JSON.stringify(notes));
  }
};

let activeNoteTarget = null;

function openNotesModal(surahNo, ayatNo, surahName, teksArab) {
  activeNoteTarget = { surahNo, ayatNo, surahName, teksArab };
  const modal = document.getElementById('notesModal');
  document.getElementById('notesModalVerseInfo').innerText = `${surahName} (Ayat ${ayatNo})`;
  document.getElementById('notesTextarea').value = NotesManager.get(surahNo, ayatNo);
  modal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('btnCloseNotes');
  const saveBtn = document.getElementById('btnSaveNote');
  const modal = document.getElementById('notesModal');

  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.add('hidden');
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      if (!activeNoteTarget) return;
      const text = document.getElementById('notesTextarea').value;
      NotesManager.save(activeNoteTarget.surahNo, activeNoteTarget.ayatNo, text, activeNoteTarget.surahName, activeNoteTarget.teksArab);
      modal.classList.add('hidden');
      if (window.location.hash === '#bookmark') {
        renderBookmarkView();
      }
    };
  }
});