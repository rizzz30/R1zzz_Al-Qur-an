const API_BASE_EQURAN = 'https://equran.id/api/v2';
const API_BASE_CLOUD = 'https://api.alquran.cloud/v1';

const QuranAPI = {
  async getSurahList() {
    try {
      const response = await fetch(`${API_BASE_EQURAN}/surat`);
      const resData = await response.json();
      return resData.data;
    } catch (err) {
      console.warn('Fallback ke API AlQuran Cloud...', err);
      const res = await fetch(`${API_BASE_CLOUD}/surah`);
      const data = await res.json();
      return data.data.map(item => ({
        nomor: item.number,
        namaLatin: item.englishName,
        nama: item.name,
        arti: item.englishNameTranslation,
        jumlahAyat: item.numberOfAyahs,
        tempatTurun: item.revelationType
      }));
    }
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
      return tafsirItem ? tafsirItem.teks : 'Tafsir belum tersedia untuk ayat ini.';
    } catch (err) {
      return 'Gagal memuat tafsir.';
    }
  }
};