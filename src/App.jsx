import React, { useState, useEffect } from 'react';

export default function HealthNewsWebsite() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  // Generate random captcha code when modal opens
  useEffect(() => {
    if (showCaptcha) {
      generateCaptchaCode();
    }
  }, [showCaptcha]);

  const generateCaptchaCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptchaCode(randomCode);
    setUserInput('');
    setError('');
  };

  const verifyCaptcha = () => {
    // Secret code check
    if (userInput === '0107387129') {
      setShowSecret(true);
      setShowCaptcha(false);
      return;
    }

    // Normal captcha verification
    if (userInput === captchaCode) {
      setRedirectUrl('https://www.kompas.com');
      setShouldRedirect(true);
    } else {
      setError('Kode CAPTCHA salah. Coba lagi.');
    }
  };

  // Handle contact button click
  const handleContactClick = () => {
    setShowCaptcha(true);
    generateCaptchaCode();
  };

  if (shouldRedirect) {
    window.location.href = redirectUrl;
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/api/placeholder/120/60" alt="Health News Logo" className="h-12 mr-3" />
              <h1 className="text-2xl font-bold">HEALTH NEWS</h1>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li className="hover:underline cursor-pointer">Beranda</li>
                <li className="hover:underline cursor-pointer">Kesehatan</li>
                <li className="hover:underline cursor-pointer">Nutrisi</li>
                <li className="hover:underline cursor-pointer">Gaya Hidup</li>
                <li className="hover:underline cursor-pointer">Tentang Kami</li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <article className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Bahaya Terlalu Banyak Makan Gula Bagi Kesehatan</h1>
          <div className="text-gray-600 mb-4 flex items-center">
            <span className="mr-4">21 April 2025</span>
            <span>Oleh: Tim Redaksi Health News</span>
          </div>

          <img 
            src="/api/placeholder/800/400" 
            alt="Gula dan Kesehatan" 
            className="w-full h-64 object-cover mb-6 rounded"
          />

          <div className="prose max-w-none">
            <p className="mb-4 text-lg">
              Konsumsi gula telah menjadi bagian yang tidak terpisahkan dari pola makan modern. 
              Meskipun memberikan rasa manis yang menyenangkan, konsumsi gula berlebihan dapat 
              menimbulkan berbagai masalah kesehatan serius. Artikel ini akan membahas bahaya 
              konsumsi gula berlebihan dan bagaimana hal itu dapat mempengaruhi kesehatan Anda.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Apa itu Gula dan Bentuknya dalam Makanan</h2>
            
            <p className="mb-4">
              Gula adalah karbohidrat sederhana yang terdiri dari molekul glukosa dan fruktosa. 
              Gula dapat ditemukan secara alami dalam buah-buahan, sayuran, dan produk susu, 
              atau ditambahkan selama proses pengolahan makanan. Bentuk gula tambahan yang umum 
              termasuk sukrosa (gula meja), sirup jagung tinggi fruktosa, gula tebu, dan madu.
            </p>
            
            <p className="mb-4">
              Menurut World Health Organization (WHO), konsumsi gula sebaiknya dibatasi hingga 
              kurang dari 10% dari total asupan kalori harian, atau idenya sekitar 25 gram 
              (sekitar 6 sendok teh) untuk orang dewasa. Namun, rata-rata orang saat ini 
              mengonsumsi jauh lebih banyak dari batas yang direkomendasikan.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Dampak Kesehatan dari Konsumsi Gula Berlebihan</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">1. Obesitas dan Kenaikan Berat Badan</h3>
            
            <p className="mb-4">
              Gula mengandung kalori tinggi namun rendah nutrisi esensial, yang dapat menyebabkan 
              penambahan berat badan dan obesitas jika dikonsumsi berlebihan. Minuman manis seperti 
              soda dan jus kemasan merupakan sumber gula tambahan terbesar dalam diet modern. 
              Sebuah penelitian menunjukkan bahwa minum satu kaleng soda per hari dapat 
              meningkatkan risiko obesitas hingga 60%.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Diabetes Tipe 2</h3>
            
            <p className="mb-4">
              Konsumsi gula berlebihan dalam jangka panjang dapat menyebabkan resistensi insulin, 
              di mana sel-sel tubuh menjadi kurang responsif terhadap insulin. Insulin adalah 
              hormon yang membantu mengatur kadar gula darah. Ketika tubuh menjadi resisten 
              terhadap insulin, kadar gula darah meningkat, yang dapat menyebabkan diabetes tipe 2.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3. Penyakit Jantung</h3>
            
            <p className="mb-4">
              Diet tinggi gula dapat meningkatkan risiko penyakit jantung dengan berbagai cara. 
              Studi terbaru menunjukkan bahwa konsumsi gula tambahan yang tinggi dapat meningkatkan 
              trigliserida, menurunkan kolesterol HDL (kolesterol "baik"), dan meningkatkan 
              peradangan, yang semuanya merupakan faktor risiko penyakit jantung.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4. Penyakit Hati Berlemak Non-alkoholik</h3>
            
            <p className="mb-4">
              Konsumsi fruktosa berlebihan (jenis gula yang ditemukan di banyak makanan olahan) 
              dapat menyebabkan penumpukan lemak di hati. Kondisi ini dikenal sebagai penyakit 
              hati berlemak non-alkoholik dan dapat berkembang menjadi peradangan hati, fibrosis, 
              dan bahkan sirosis pada kasus yang parah.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5. Kerusakan Gigi</h3>
            
            <p className="mb-4">
              Bakteri di mulut menggunakan gula sebagai sumber energi dan menghasilkan asam yang 
              dapat merusak enamel gigi, menyebabkan karies gigi. Minuman manis seperti soda dan 
              jus buah sangat berbahaya karena membuat gigi terus-menerus terpapar gula.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6. Penuaan Dini dan Kerusakan Kulit</h3>
            
            <p className="mb-4">
              Konsumsi gula berlebihan dapat mempercepat proses penuaan kulit melalui proses yang 
              disebut glikasi. Dalam proses ini, gula berikatan dengan protein dalam kulit 
              (terutama kolagen dan elastin), merusaknya dan menyebabkan keriput dan elastisitas 
              kulit berkurang.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7. Dampak pada Kesehatan Mental</h3>
            
            <p className="mb-4">
              Beberapa penelitian menunjukkan hubungan antara konsumsi gula tinggi dan risiko 
              depresi serta gangguan mood lainnya. Fluktuasi kadar gula darah dapat mempengaruhi 
              hormon dan neurotransmiter yang mengatur suasana hati, menyebabkan perubahan energi 
              dan perasaan yang drastis.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8. Inflamasi Kronis</h3>
            
            <p className="mb-4">
              Gula dapat memicu peradangan di seluruh tubuh, yang meningkatkan risiko berbagai 
              penyakit kronis seperti penyakit jantung, diabetes, artritis, dan bahkan beberapa 
              jenis kanker. Peradangan kronis juga dikaitkan dengan penuaan dini dan penurunan 
              fungsi kognitif.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cara Mengurangi Konsumsi Gula</h2>

            <p className="mb-4">
              Mengurangi konsumsi gula bisa jadi tantangan, terutama karena gula hadir dalam banyak 
              makanan olahan, bahkan yang tidak terasa manis. Namun, beberapa langkah berikut dapat 
              membantu:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">1. Membaca Label Nutrisi</h3>
            
            <p className="mb-4">
              Perhatikan kandungan gula dalam produk yang Anda beli. Gula sering tersembunyi dalam 
              nama lain seperti sukrosa, maltosa, dekstrosa, sirup jagung tinggi fruktosa, dan molase.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Ganti Minuman Manis</h3>
            
            <p className="mb-4">
              Ganti soda, jus buah kemasan, dan minuman manis lainnya dengan air putih, teh tanpa gula, 
              atau air dengan perasan lemon atau jeruk nipis.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3. Kurangi Secara Bertahap</h3>
            
            <p className="mb-4">
              Mengurangi gula secara bertahap dapat membantu lidah Anda beradaptasi dengan makanan 
              yang kurang manis. Misalnya, jika biasanya Anda menggunakan dua sendok gula dalam kopi, 
              cobalah menguranginya menjadi satu setengah sendok selama seminggu, kemudian satu sendok, 
              dan seterusnya.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4. Pilih Sumber Gula Alami</h3>
            
            <p className="mb-4">
              Jika Anda menginginkan makanan manis, pilihlah buah-buahan utuh sebagai alternatif 
              makanan penutup atau camilan. Buah mengandung serat yang membantu memperlambat penyerapan 
              gula ke dalam darah.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5. Masak di Rumah</h3>
            
            <p className="mb-4">
              Dengan memasak sendiri, Anda dapat mengontrol jumlah gula yang ditambahkan ke makanan. 
              Eksperimen dengan rempah-rempah seperti kayu manis, vanila, atau pala untuk menambah rasa 
              tanpa menggunakan gula.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Kesimpulan</h2>
            
            <p className="mb-4">
              Meskipun gula memberikan kenikmatan saat dikonsumsi, dampak negatifnya pada kesehatan 
              tidak bisa diabaikan. Dengan menyadari bahaya konsumsi gula berlebihan dan mengambil 
              langkah-langkah untuk menguranginya, Anda dapat meningkatkan kesehatan jangka panjang 
              dan mencegah berbagai penyakit kronis.
            </p>
            
            <p className="mb-4">
              Ingatlah bahwa mengubah kebiasaan makan tidak selalu mudah dan membutuhkan waktu. Mulailah 
              dengan langkah kecil dan tingkatkan secara bertahap untuk hasil yang berkelanjutan. Konsultasikan 
              dengan profesional kesehatan atau ahli gizi untuk saran yang lebih spesifik sesuai dengan 
              kebutuhan kesehatan Anda.
            </p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Tentang Health News</h3>
              <p className="text-gray-600">
                Health News adalah sumber terpercaya untuk informasi kesehatan terkini dan 
                berbasis bukti ilmiah. Kami berkomitmen untuk memberikan konten yang akurat 
                dan bermanfaat untuk meningkatkan kesehatan dan kesejahteraan pembaca kami.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Kategori</h3>
              <ul className="text-gray-600">
                <li className="mb-2 hover:text-blue-600 cursor-pointer">Nutrisi</li>
                <li className="mb-2 hover:text-blue-600 cursor-pointer">Penyakit</li>
                <li className="mb-2 hover:text-blue-600 cursor-pointer">Kebugaran</li>
                <li className="mb-2 hover:text-blue-600 cursor-pointer">Kesehatan Mental</li>
                <li className="mb-2 hover:text-blue-600 cursor-pointer">Gaya Hidup Sehat</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-4">Langganan</h3>
              <p className="text-gray-600 mb-4">
                Dapatkan artikel kesehatan terbaru langsung ke email Anda.
              </p>
              <div className="flex mb-4">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                  Langganan
                </button>
              </div>
              <div className="flex items-center justify-between mt-8">
                <span 
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={handleContactClick}
                  style={{ textDecoration: 'none' }}
                >
                  Hubungi Kami
                </span>
                <div className="flex space-x-4">
                  <span className="text-blue-600 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </span>
                  <span className="text-blue-600 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </span>
                  <span className="text-blue-600 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">&copy; 2025 Health News. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* CAPTCHA Modal */}
      {showCaptcha && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowCaptcha(false)}></div>
          <div className="bg-white p-6 rounded-lg shadow-xl z-10 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Verifikasi CAPTCHA</h3>
              <button 
                onClick={() => setShowCaptcha(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-2">Masukkan kode verifikasi:</p>
              <div className="bg-gray-100 p-3 mb-4 text-center font-mono text-xl">
                {captchaCode}
              </div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Masukkan kode di atas"
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
            <button
              onClick={verifyCaptcha}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Verifikasi
            </button>
          </div>
        </div>
      )}

      {/* Secret Page */}
      {showSecret && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
          <div className="p-8 max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Halaman Rahasia</h2>
            <p className="text-lg mb-6">Informasi penting disimpan di sini.</p>
            <button
              onClick={() => setShowSecret(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }
