const daftarDoaHarian = [
  { judul: "1. Doa Sebelum Tidur", arab: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", arti: "Dengan nama-Mu, ya Allah, aku mati dan aku hidup." },
  { judul: "2. Doa Bangun Tidur", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", arti: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami..." },
  { judul: "3. Doa Sebelum Makan", arab: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", arti: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan..." },
  { judul: "4. Doa Sesudah Makan", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", arti: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami Muslim." },
  { judul: "5. Doa Masuk Kamar Mandi", arab: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", arti: "Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan." },
  { judul: "6. Doa Keluar Kamar Mandi", arab: "غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الأَذَى وَعَافَانِي", arti: "Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan kotoran dan menyehatkan." },
  { judul: "7. Doa Keluar Rumah", arab: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", arti: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan Allah." },
  { judul: "8. Doa Masuk Rumah", arab: "اللَّهُمَّ إِنِّى أَسْأَلُكَ خَيْرَ المَوْلِجِ وَخَيْرَ المَخْرَجِ", arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan tempat keluar." },
  { judul: "9. Doa Naik Kendaraan", arab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", arti: "Maha Suci Allah yang telah menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu." },
  { judul: "10. Doa Masuk Masjid", arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", arti: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu." },
  { judul: "11. Doa Keluar Masjid", arab: "اللَّهُمَّ إِنِّى أَسْأَلُكَ مِنْ فَضْلِكَ", arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu." },
  { judul: "12. Doa Kedua Orang Tua", arab: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", arti: "Ya Allah, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah keduanya..." },
  { judul: "13. Doa Kebaikan Dunia Akhirat", arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", arti: "Ya Tuhan kami, berikanlah kami kebaikan di dunia dan akhirat, serta peliharalah kami dari siksa neraka." },
  { judul: "14. Doa Memohon Ilmu yang Bermanfaat", arab: "اللَّهُمَّ إِنِّى أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً", arti: "Ya Allah, aku mohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima." },
  { judul: "15. Doa Memohon Kesembuhan Penyakit", arab: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ", arti: "Hilangkanlah penyakit ini wahai Penguasa manusia, sembuhkanlah, Engkau Maha Penyembuh..." },
  { judul: "16. Doa Terhindar dari Kesulitan", arab: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا", arti: "Ya Allah, tidak ada kemudahan kecuali yang Engkau jadikan mudah..." },
  { judul: "17. Doa Ketika Tertimpa Musibah", arab: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا", arti: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah, berilah pahala..." },
  { judul: "18. Doa Memohon Ampunan", arab: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...", arti: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau yang menciptakan aku..." },
  { judul: "19. Doa Masuk Pasar", arab: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ...", arti: "Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya..." },
  { judul: "20. Doa Ketika Bercermin", arab: "اللَّهُمَّ كَمَا أَحْسَنْتَ خَلْقِي فَأَحْسِنْ خُلُقِي", arti: "Ya Allah, sebagaimana Engkau telah memperindah jasadku, maka indahkanlah pula akhlakku." },
  { judul: "21. Doa Memakai Pakaian", arab: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", arti: "Segala puji bagi Allah yang telah memberiku pakaian ini sebagai rezeki..." },
  { judul: "22. Doa Melepas Pakaian", arab: "بِسْمِ اللَّهِ الَّذِي لَا إِلَهَ إِلَّا هُوَ", arti: "Dengan nama Allah yang tiada Tuhan selain Dia." },
  { judul: "23. Doa Masuk Kamar Tidur", arab: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا", arti: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, serta kepada Tuhan kami kami bertawakal." },
  { judul: "24. Doa Ketika Mimpi Buruk", arab: "أُعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ", arti: "Aku berlindung dengan kalimat Allah yang sempurna dari murka-Nya..." },
  { judul: "25. Doa Hendak Belajar", arab: "رَبِّ زِدْنِي عِلْمًا، وَارْزُقْنِي فَهْمًا", arti: "Ya Allah, tambahkanlah kepadaku ilmu dan berikanlah aku karunia pemahaman." },
  { judul: "26. Doa Selesai Belajar", arab: "اللَّهُمَّ إِنِّى أَسْتَوْدِعُكَ مَا عَلَمْتَنِيهِ، فَردُدْهُ إِلَىَّ عِنْدَ حَاجَتِى", arti: "Ya Allah, sesungguhnya aku titipkan kepada-Mu apa yang telah Engkau ajarkan kepadaku..." },
  { judul: "27. Doa Masuk Kuburan", arab: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ", arti: "Salam sejahtera atas kalian wahai penduduk kampung mukmin dan muslim..." },
  { judul: "28. Doa Ketika Turun Hujan", arab: "اللَّهُمَّ صَيِّبًا نَافِعًا", arti: "Ya Allah, jadikanlah hujan ini hujan yang bermanfaat." },
  { judul: "29. Doa Setelah Hujan Reda", arab: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ", arti: "Kami diberi hujan karena karunia dan rahmat Allah." },
  { judul: "30. Doa Mendengar Petir", arab: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ", arti: "Maha Suci Allah yang petir bertasbih dengan memuji-Nya..." },
  { judul: "31. Doa Ketika Angin Kencang", arab: "اللَّهُمَّ إِنِّى أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ", arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan angin ini..." },
  { judul: "32. Doa Melihat Hilal", arab: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ", arti: "Ya Allah, tampakkanlah bulan itu kepada kami dengan aman dan iman." },
  { judul: "33. Doa Meminta Keturunan Shalih", arab: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", arti: "Ya Tuhanku, anugerahkanlah kepadaku keturunan yang saleh." },
  { judul: "34. Doa Sujud Tilawah", arab: "سَجَدَ وَجْهِي لِلَّذِي خَلَقَهُ، وَصَوَّرَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ", arti: "Wajahku bersujud kepada Zat yang menciptakannya..." },
  { judul: "35. Doa Terhindar dari Keraguan", arab: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ", arti: "Ya Tuhanku, aku berlindung kepada-Mu dari bisikan setan..." },
  { judul: "36. Doa Ketika Marah", arab: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", arti: "Aku berlindung kepada Allah dari godaan setan yang terkutuk." },
  { judul: "37. Doa Istikharah", arab: "اللَّهُمَّ إِنِّى أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ", arti: "Ya Allah, sesungguhnya aku memohon petunjuk kebaikan kepada-Mu..." },
  { judul: "38. Doa Terhindar dari Hutang", arab: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", arti: "Ya Allah, cukupkanlah aku dengan rezeki yang halal..." },
  { judul: "39. Doa Buka Puasa", arab: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ", arti: "Telah hilang rasa haus dan urat-urat telah basah..." },
  { judul: "40. Doa Sahur", arab: "يَرْحَمُ اللَّهُ الْمُتَسَحِّرِينَ", arti: "Semoga Allah menurunkan rahmat-Nya bagi orang-orang yang bersahur." },
  { judul: "41. Doa Masuk Toko", arab: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ...", arti: "Tiada Tuhan selain Allah Yang Maha Esa..." },
  { judul: "42. Doa Tidur (Ayat Kursi)", arab: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...", arti: "Allah, tidak ada Tuhan selain Dia Yang Maha Hidup..." },
  { judul: "43. Doa Keselamatan Iman", arab: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ", arti: "Wahai Zat yang membolak-balikkan hati, tetapkanlah hatiku di atas agama-Mu." },
  { judul: "44. Doa Wabah Penyakit", arab: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْبرَصِ وَالْجُنُونِ وَالْجُذَامِ وَمِنْ سَيِّئِ الأَسْقَامِ", arti: "Ya Allah, aku berlindung dari penyakit berat dan buruk..." },
  { judul: "45. Doa Ampunan Sesama Muslim", arab: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقونَا بِالْإِيمَانِ", arti: "Ya Tuhan kami, ampunilah dosa kami dan saudara-saudara kami..." },
  { judul: "46. Doa Sifat Malas", arab: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجبْنِ وَالْهَرَمِ", arti: "Ya Allah, aku berlindung kepada-Mu dari kelemahan dan rasa malas..." },
  { judul: "47. Doa Menjenguk Orang Sakit", arab: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", arti: "Tidak apa-apa, semoga suci (dosa) insya Allah." },
  { judul: "48. Doa Menghadapi Kesusahan", arab: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", arti: "Cukuplah bagi kami Allah dan sebaik-baik penolong." },
  { judul: "49. Doa Mengusir Was-was", arab: "آمَنْتُ بِاللَّهِ وَرُسُلِهِ", arti: "Aku beriman kepada Allah dan rasul-rasul-Nya." },
  { judul: "50. Doa Penutup Majelis", arab: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ...", arti: "Maha Suci Engkau ya Allah, dan dengan memuji-Mu..." }
];

function renderDoaHarian() {
  const container = document.getElementById('doaGridContainer');
  if (!container) return;
  container.innerHTML = daftarDoaHarian.map(d => `
    <div class="verse-card">
      <h3 style="color:var(--primary-emerald); margin-bottom: 0.8rem; font-size: 1.1rem;">${d.judul}</h3>
      <p class="verse-arabic" style="font-size: 26px; margin-bottom: 1rem;">${d.arab}</p>
      <p class="verse-translation" style="font-size: 0.95rem;">"${d.arti}"</p>
    </div>
  `).join('');
}