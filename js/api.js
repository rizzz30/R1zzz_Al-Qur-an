const API_BASE_EQURAN = 'https://equran.id/api/v2';

const QuranAPI = {
  async getSurahList() {
    const response = await fetch(`${API_BASE_EQURAN}/surat`);
    const resData = await response.json();
    return resData.data;
  },

  async getSurahDetail(surahNo) {
    const response = await fetch(`${API_BASE_EQURAN}/surat/${surahNo}`);
    const resData = await response.json();
    return resData.data;
  },

  async getTafsirAyat(surahNo, ayatNo) {
    try {
      const res = await fetch(`${API_BASE_EQURAN}/tafsir/${surahNo}`);
      const data = await res.json();
      const tafsirItem = data.data.tafsir.find(t => t.ayat === parseInt(ayatNo));
      return tafsirItem ? tafsirItem.teks : 'Tafsir belum tersedia.';
    } catch (err) {
      return 'Gagal memuat tafsir.';
    }
  }
};