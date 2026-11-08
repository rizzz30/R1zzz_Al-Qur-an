const AudioPlayer = {
  audio: new Audio(),
  playlist: [],
  currentIndex: 0,
  isAutoPlayAll: false,

  init() {
    this.audio.addEventListener('ended', () => {
      if (this.isAutoPlayAll && this.currentIndex < this.playlist.length - 1) {
        this.currentIndex++;
        this.playCurrentIndex();
      } else {
        this.stopAutoPlayUI();
      }
    });
  },

  getCurrentQari() {
    const select = document.getElementById('qariSelect');
    // Menggunakan mapping kode qari angka resmi dari server audio equran
    const qariMap = {
      'ar.alafasy': '05',
      'ar.sudais': '01',
      'ar.abdulbasit': '02',
      'ar.shaatree': '03',
      'ar.minshawi': '04',
      'ar.husary': '06',
      'ar.ahmedajamy': '07',
      'ar.mahermuaiqly': '08',
      'ar.saadghamdi': '09',
      'ar.hudhaify': '10'
    };
    const val = select ? select.value : 'ar.alafasy';
    return qariMap[val] || '05';
  },

  getAudioUrl(originalUrl) {
    if (!originalUrl) return '';
    const targetQariCode = this.getCurrentQari();
    // Mengganti direktori qari pada link audio (misal /05/ menjadi /01/, /07/, dll)
    return originalUrl.replace(/\/\d{2}\//, `/${targetQariCode}/`);
  },

  playList(items, startIndex = 0) {
    this.playlist = items;
    this.currentIndex = startIndex;
    this.isAutoPlayAll = true;
    this.playCurrentIndex();
  },

  playCurrentIndex() {
    if (this.playlist.length === 0 || this.currentIndex >= this.playlist.length) return;
    const item = this.playlist[this.currentIndex];

    this.audio.src = this.getAudioUrl(item.url);
    this.audio.play().catch(e => console.warn("Audio play error:", e));

    const select = document.getElementById('qariSelect');
    const qariName = select ? select.options[select.selectedIndex].text : 'Mishary Rashid Alafasy';

    document.getElementById('audioTitle').innerText = item.title;
    document.getElementById('audioQari').innerText = qariName;
    document.getElementById('audioPlayerBar').classList.remove('hidden');
    document.getElementById('btnAudioPlayPause').innerHTML = '<i class="fa-solid fa-pause"></i>';

    document.querySelectorAll('.verse-card').forEach(el => el.classList.remove('playing-highlight'));
    const activeCard = document.getElementById(`verse-card-${item.ayatNo}`);
    if (activeCard) {
      activeCard.classList.add('playing-highlight');
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  playSingle(url, title, ayatNo) {
    this.isAutoPlayAll = false;
    this.audio.src = this.getAudioUrl(url);
    this.audio.play().catch(e => console.warn("Audio play error:", e));

    const select = document.getElementById('qariSelect');
    const qariName = select ? select.options[select.selectedIndex].text : 'Mishary Rashid Alafasy';

    document.getElementById('audioTitle').innerText = title;
    document.getElementById('audioQari').innerText = qariName;
    document.getElementById('audioPlayerBar').classList.remove('hidden');
    document.getElementById('btnAudioPlayPause').innerHTML = '<i class="fa-solid fa-pause"></i>';

    document.querySelectorAll('.verse-card').forEach(el => el.classList.remove('playing-highlight'));
    const activeCard = document.getElementById(`verse-card-${ayatNo}`);
    if (activeCard) activeCard.classList.add('playing-highlight');
  },

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
      document.getElementById('btnAudioPlayPause').innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.audio.pause();
      document.getElementById('btnAudioPlayPause').innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  },

  next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.playCurrentIndex();
    }
  },

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.playCurrentIndex();
    }
  },

  close() {
    this.audio.pause();
    this.isAutoPlayAll = false;
    document.getElementById('audioPlayerBar').classList.add('hidden');
    document.querySelectorAll('.verse-card').forEach(el => el.classList.remove('playing-highlight'));
  },

  stopAutoPlayUI() {
    this.isAutoPlayAll = false;
    document.getElementById('btnAudioPlayPause').innerHTML = '<i class="fa-solid fa-play"></i>';
  }
};

AudioPlayer.init();