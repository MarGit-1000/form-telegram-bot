import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';

export default function RegistrationApp() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaSiswa: '',
    tempatLahir: '',
    tanggalLahir: '',
    nisn: '',
    emailSiswa: '',
    nomorTelepon: '',
    asalSekolah: '',
    alasanMemilihSekolah: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    
    // In a real application, this would send the data to a server
    // For this demo, we'll just show the success message
    setFormSubmitted(true);
    
    // Note: In a real implementation, you would send this data to your Telegram bot
    // using a secure backend service. Frontend-only solutions would expose your API tokens.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 font-sans relative overflow-hidden">
      {/* Nature-themed decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="text-green-700">
          <path fill="currentColor" d="M20,20 Q80,10 100,60 T180,90 Q150,150 80,170 T20,120 Q30,70 20,20" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="text-green-700">
          <path fill="currentColor" d="M180,180 Q120,190 100,140 T20,110 Q50,50 120,30 T180,80 Q170,130 180,180" />
        </svg>
      </div>
      
      {/* Branch decorations */}
      <div className="absolute top-10 right-10 opacity-30">
        <svg viewBox="0 0 100 100" width="150" height="150" className="text-brown-600">
          <path fill="currentColor" d="M50,0 L55,40 L70,35 L60,50 L80,55 L60,65 L75,80 L50,70 L45,100 L40,70 L15,80 L30,65 L10,55 L30,50 L20,35 L35,40 L50,0" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-4">SMA Negeri 1 Pare-Pare</h1>
          <p className="text-xl text-green-700">Pendaftaran Siswa Baru</p>
        </header>

        {!showForm && !formSubmitted && (
          <div className="flex justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
            >
              <span className="mr-2">Daftar Sekarang</span>
              <CheckCircle size={20} />
            </button>
          </div>
        )}

        {showForm && !formSubmitted && (
          <div className="animate-fadeIn bg-white bg-opacity-90 rounded-lg shadow-xl p-6 max-w-2xl mx-auto border border-green-200">
            <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Formulir Pendaftaran</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-green-700 mb-2">Nama Siswa</label>
                  <input 
                    type="text" 
                    name="namaSiswa"
                    value={formData.namaSiswa}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">Tempat Lahir</label>
                  <input 
                    type="text" 
                    name="tempatLahir"
                    value={formData.tempatLahir}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">NISN</label>
                  <input 
                    type="text" 
                    name="nisn"
                    value={formData.nisn}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">Email Siswa</label>
                  <input 
                    type="email" 
                    name="emailSiswa"
                    value={formData.emailSiswa}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">Nomor Telepon</label>
                  <input 
                    type="tel" 
                    name="nomorTelepon"
                    value={formData.nomorTelepon}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-700 mb-2">Asal Sekolah</label>
                  <input 
                    type="text" 
                    name="asalSekolah"
                    value={formData.asalSekolah}
                    onChange={handleChange}
                    className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-green-700 mb-2">Alasan Memilih Sekolah</label>
                <textarea 
                  name="alasanMemilihSekolah"
                  value={formData.alasanMemilihSekolah}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
                >
                  <span className="mr-2">Kirim Data</span>
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}
        
        {formSubmitted && (
          <div className="animate-fadeIn bg-white bg-opacity-90 rounded-lg shadow-xl p-6 max-w-2xl mx-auto border border-green-200">
            <div className="text-center mb-6">
              <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold text-green-800">Data Anda Telah Dikirim!</h2>
              <p className="text-green-700 mt-2">Lihat informasi data yang anda kirim</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">Data Pendaftaran:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-green-700"><strong>Nama:</strong> {formData.namaSiswa}</p>
                  <p className="text-green-700"><strong>Tempat Lahir:</strong> {formData.tempatLahir}</p>
                  <p className="text-green-700"><strong>Tanggal Lahir:</strong> {formData.tanggalLahir}</p>
                  <p className="text-green-700"><strong>NISN:</strong> {formData.nisn}</p>
                </div>
                <div>
                  <p className="text-green-700"><strong>Email:</strong> {formData.emailSiswa}</p>
                  <p className="text-green-700"><strong>Nomor Telepon:</strong> {formData.nomorTelepon}</p>
                  <p className="text-green-700"><strong>Asal Sekolah:</strong> {formData.asalSekolah}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-green-700"><strong>Alasan Memilih Sekolah:</strong></p>
                <p className="text-green-700 bg-white p-2 rounded">{formData.alasanMemilihSekolah}</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setShowForm(false);
                  setFormSubmitted(false);
                  setFormData({
                    namaSiswa: '',
                    tempatLahir: '',
                    tanggalLahir: '',
                    nisn: '',
                    emailSiswa: '',
                    nomorTelepon: '',
                    asalSekolah: '',
                    alasanMemilihSekolah: ''
                  });
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-green-700">
        <p>© 2025 SMA Negeri 1 Pare-Pare</p>
      </footer>
      
      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
                }
