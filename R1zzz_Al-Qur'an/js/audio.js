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

  playList(items, startIndex = 0) {
    this.playlist = items;
    this.currentIndex = startIndex;
    this.isAutoPlayAll = true;
    this.playCurrentIndex();
  },

  playCurrentIndex() {
    if (this.playlist.length === 0 || this.currentIndex >= this.playlist.length) return;
    const item = this.playlist[this.currentIndex];

    this.audio.src = item.url;
    this.audio.play().catch(e => console.warn("Audio play error:", e));

    document.getElementById('audioTitle').innerText = item.title;
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
    this.audio.src = url;
    this.audio.play().catch(e => console.warn("Audio play error:", e));

    document.getElementById('audioTitle').innerText = title;
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