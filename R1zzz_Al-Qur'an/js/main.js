let currentSurahList = [];
let currentArabSize = 32;
let currentTransSize = 16;
let currentSurahData = null;

document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupEvents();
  loadLastRead();
  renderDoaHarian();
  await initSurahData();
});

function setupNavigation() {
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('hashchange', handleRoute);

  function handleRoute() {
    const hash = window.location.hash || '#beranda';
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    links.forEach(l => l.classList.remove('active'));

    if (hash.startsWith('#reader')) {
      document.getElementById('view-reader').classList.add('active');
      const surahNo = hash.split('/')[1] || 1;
      renderReader(surahNo);
    } else if (hash === '#bookmark') {
      document.getElementById('view-bookmark').classList.add('active');
      renderBookmarkView();
    } else if (hash === '#search') {
      document.getElementById('view-search').classList.add('active');
    } else {
      const activeView = document.querySelector(`#view-${hash.replace('#', '')}`);
      if (activeView) activeView.classList.add('active');
      const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  }

  handleRoute();
}

async function initSurahData() {
  currentSurahList = await QuranAPI.getSurahList();
  renderSurahGrid(currentSurahList);
  renderFeaturedSurah(currentSurahList);
  renderJuzGrid();
  setupSearchFilter();
  setupGlobalSearch();
}

function renderSurahGrid(data) {
  const container = document.getElementById('surahGrid');
  if (!container) return;
  container.innerHTML = data.map(s => `
    <div class="surah-card" onclick="location.hash='#reader/${s.nomor}'">
      <div class="surah-number">${s.nomor}</div>
      <div class="surah-meta">
        <div class="surah-title-latin">${s.namaLatin}</div>
        <div class="surah-subtext">${s.arti} • ${s.jumlahAyat} Ayat</div>
      </div>
      <div class="surah-title-arabic">${s.nama}</div>
    </div>
  `).join('');
}

function renderFeaturedSurah(data) {
  const featuredIds = [1, 18, 36, 55, 56, 67, 112];
  const filtered = data.filter(s => featuredIds.includes(s.nomor));
  const container = document.getElementById('featuredSurahGrid');
  if (!container) return;
  container.innerHTML = filtered.map(s => `
    <div class="surah-card" onclick="location.hash='#reader/${s.nomor}'">
      <div class="surah-number">${s.nomor}</div>
      <div class="surah-meta">
        <div class="surah-title-latin">${s.namaLatin}</div>
        <div class="surah-subtext">${s.jumlahAyat} Ayat</div>
      </div>
      <div class="surah-title-arabic">${s.nama}</div>
    </div>
  `).join('');
}

function renderJuzGrid() {
  const container = document.getElementById('juzGrid');
  if (!container) return;
  let html = '';
  for (let i = 1; i <= 30; i++) {
    html += `
      <div class="juz-card" onclick="alert('Juz ${i} dapat dibaca melalui daftar surah.')">
        <div>
          <h3 style="color:var(--primary-emerald)">Juz ${i}</h3>
          <p class="surah-subtext">Bagian Juz ke-${i} Mushaf Al-Qur'an</p>
        </div>
        <button class="btn btn-outline" style="color:var(--primary-emerald); border-color:var(--primary-emerald);">Buka</button>
      </div>
    `;
  }
  container.innerHTML = html;
}

async function renderReader(surahNo) {
  const container = document.getElementById('versesContainer');
  const header = document.getElementById('readerHeader');
  if (!container) return;
  container.innerHTML = '<p class="text-center">Memuat ayat suci Al-Qur\'an...</p>';

  try {
    currentSurahData = await QuranAPI.getSurahDetail(surahNo);
    header.innerHTML = `
      <h2>${currentSurahData.namaLatin} (${currentSurahData.nama})</h2>
      <p>${currentSurahData.arti} • ${currentSurahData.tempatTurun} • ${currentSurahData.jumlahAyat} Ayat</p>
    `;

    const playlist = currentSurahData.ayat.map(a => {
      const audioUrl = a.audio['05'] || a.audio['01'] || Object.values(a.audio)[0];
      return {
        ayatNo: a.nomorAyat,
        url: audioUrl,
        title: `${currentSurahData.namaLatin}: Ayat ${a.nomorAyat}`
      };
    });

    document.getElementById('btnAutoPlayAll').onclick = () => {
      if (playlist.length > 0) AudioPlayer.playList(playlist, 0);
    };

    container.innerHTML = currentSurahData.ayat.map(a => {
      const isBookmarked = BookmarkManager.isBookmarked(currentSurahData.nomor, a.nomorAyat);
      const audioUrl = a.audio['05'] || a.audio['01'] || Object.values(a.audio)[0];
      return `
        <div class="verse-card" id="verse-card-${a.nomorAyat}">
          <div class="verse-header">
            <span class="verse-badge">${currentSurahData.nomor}:${a.nomorAyat}</span>
            <div class="verse-actions">
              <button class="action-btn bookmark-btn-${currentSurahData.nomor}-${a.nomorAyat} ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(${currentSurahData.nomor}, ${a.nomorAyat}, '${currentSurahData.namaLatin}', '${escapeHtml(a.teksArab)}')">
                <i class="fa-solid fa-bookmark"></i>
              </button>
              <button class="action-btn" onclick="AudioPlayer.playSingle('${audioUrl}', '${currentSurahData.namaLatin}: Ayat ${a.nomorAyat}', ${a.nomorAyat})">
                <i class="fa-solid fa-play"></i>
              </button>
              <button class="action-btn" onclick="openTafsir(${currentSurahData.nomor}, ${a.nomorAyat}, '${currentSurahData.namaLatin}')">
                <i class="fa-solid fa-book-open"></i>
              </button>
            </div>
          </div>
          <div class="verse-arabic" style="font-size:${currentArabSize}px">${a.teksArab}</div>
          <div class="verse-translation" style="font-size:${currentTransSize}px">${a.teksIndonesia}</div>
        </div>
      `;
    }).join('');

    const prevNo = parseInt(surahNo) > 1 ? parseInt(surahNo) - 1 : 114;
    const nextNo = parseInt(surahNo) < 114 ? parseInt(surahNo) + 1 : 1;
    document.getElementById('btnPrevSurah').onclick = () => location.hash = `#reader/${prevNo}`;
    document.getElementById('btnNextSurah').onclick = () => location.hash = `#reader/${nextNo}`;

    LastReadManager.set({
      surahNo: currentSurahData.nomor,
      surahName: currentSurahData.namaLatin,
      ayatNo: 1
    });
    loadLastRead();
  } catch (err) {
    container.innerHTML = `<p class="text-center" style="color:red;">Gagal memuat surah. Periksa koneksi internet Anda.</p>`;
  }
}

function renderBookmarkView() {
  const container = document.getElementById('bookmarkList');
  const bookmarks = BookmarkManager.getAll();
  if (!container) return;
  if (bookmarks.length === 0) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-muted-light); padding:2rem;">Belum ada ayat yang disimpan ke dalam bookmark.</p>`;
    return;
  }
  container.innerHTML = bookmarks.map(b => `
    <div class="verse-card">
      <div class="verse-header">
        <span class="verse-badge">${b.surahName} (Ayat ${b.ayatNo})</span>
        <div class="verse-actions">
          <button class="action-btn active" onclick="toggleBookmark(${b.surahNo}, ${b.ayatNo}, '${b.surahName}', '${escapeHtml(b.teksArab)}')">
            <i class="fa-solid fa-bookmark"></i>
          </button>
          <button class="action-btn" onclick="location.hash='#reader/${b.surahNo}'">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>
      </div>
      <div class="verse-arabic" style="font-size:32px">${b.teksArab}</div>
    </div>
  `).join('');
}

async function openTafsir(surahNo, ayatNo, surahName) {
  const modal = document.getElementById('tafsirModal');
  const body = document.getElementById('tafsirModalBody');
  document.getElementById('tafsirModalTitle').innerText = `Tafsir ${surahName}: Ayat ${ayatNo}`;
  modal.classList.remove('hidden');
  body.innerHTML = 'Memuat tafsir Kemenag...';
  const text = await QuranAPI.getTafsirAyat(surahNo, ayatNo);
  body.innerHTML = `<p style="line-height:1.8;">${text}</p>`;
}

function loadLastRead() {
  const lastData = LastReadManager.get();
  if (lastData) {
    document.getElementById('lastReadTitle').innerText = `${lastData.surahName} (Ayat ${lastData.ayatNo})`;
    document.getElementById('lastReadDetail').innerText = `Terakhir dibaca`;
    const btn = document.getElementById('btnContinueRead');
    btn.disabled = false;
    btn.onclick = () => location.hash = `#reader/${lastData.surahNo}`;
  }
}

function setupSearchFilter() {
  const input = document.getElementById('surahSearchInput');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = currentSurahList.filter(s => 
      s.namaLatin.toLowerCase().includes(keyword) || 
      s.nomor.toString() === keyword ||
      s.arti.toLowerCase().includes(keyword)
    );
    renderSurahGrid(filtered);
  });
}

function setupGlobalSearch() {
  const btn = document.getElementById('btnSubmitSearch');
  const input = document.getElementById('globalSearchInput');
  if (!btn || !input) return;
  btn.onclick = async () => {
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    const container = document.getElementById('searchResultsContainer');
    const countInfo = document.getElementById('searchResultCount');
    container.innerHTML = '<p class="text-center">Mencari surah...</p>';

    const found = currentSurahList.filter(s => s.namaLatin.toLowerCase().includes(query) || s.arti.toLowerCase().includes(query));
    countInfo.innerText = `Ditemukan ${found.length} surah yang cocok dengan "${query}"`;
    container.innerHTML = found.map(s => `
      <div class="surah-card" onclick="location.hash='#reader/${s.nomor}'" style="margin-bottom: 10px;">
        <div class="surah-number">${s.nomor}</div>
        <div class="surah-meta">
          <div class="surah-title-latin">${s.namaLatin}</div>
          <div class="surah-subtext">${s.arti} • ${s.jumlahAyat} Ayat</div>
        </div>
        <div class="surah-title-arabic">${s.nama}</div>
      </div>
    `).join('');
  };
}

function setupEvents() {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
  document.getElementById('btnCloseTafsir').addEventListener('click', () => {
    document.getElementById('tafsirModal').classList.add('hidden');
  });
  document.getElementById('btnAudioPlayPause').addEventListener('click', () => AudioPlayer.toggle());
  document.getElementById('btnAudioNext').addEventListener('click', () => AudioPlayer.next());
  document.getElementById('btnAudioPrev').addEventListener('click', () => AudioPlayer.prev());
  document.getElementById('btnAudioClose').addEventListener('click', () => AudioPlayer.close());

  document.getElementById('btnFontArabInc').onclick = () => { currentArabSize += 2; updateFontSizes(); };
  document.getElementById('btnFontArabDec').onclick = () => { if (currentArabSize > 20) currentArabSize -= 2; updateFontSizes(); };
  document.getElementById('btnFontTransInc').onclick = () => { currentTransSize += 2; updateFontSizes(); };
  document.getElementById('btnFontTransDec').onclick = () => { if (currentTransSize > 12) currentTransSize -= 2; updateFontSizes(); };
}

function updateFontSizes() {
  document.querySelectorAll('.verse-arabic').forEach(el => el.style.fontSize = `${currentArabSize}px`);
  document.querySelectorAll('.verse-translation').forEach(el => el.style.fontSize = `${currentTransSize}px`);
  document.getElementById('fontArabSizeDisplay').innerText = `${currentArabSize}px`;
  document.getElementById('fontTransSizeDisplay').innerText = `${currentTransSize}px`;
}

function escapeHtml(text) {
  return text.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
}