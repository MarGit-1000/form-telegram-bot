import React, { useState, useEffect } from 'react';

// Komponen utama
function App() {
  const [showButtons, setShowButtons] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jumlah: 1
  });
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  
  const hargaSatuan = 4000;

  useEffect(() => {
    // Animasi untuk memunculkan tombol setelah halaman dimuat
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    // Ambil data dari Firebase saat komponen dimuat
    fetchAllData();
    
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk mengambil semua data dari Firebase
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://form-telegram-app-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');
      const data = await response.json();
      
      if (data) {
        // Konversi dari object ke array
        const ordersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setAllData(ordersArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'jumlah' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Buat data baru
    const newData = {
      ...formData,
      total: formData.jumlah * hargaSatuan,
      waktu: new Date().toLocaleString()
    };
    
    // Kirim data ke Firebase
    try {
      const response = await fetch('https://form-telegram-app-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
      });
      
      if (response.ok) {
        // Refresh data setelah berhasil menambahkan
        fetchAllData();
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    
    // Kirim data ke bot Telegram
    sendToTelegram(newData);
    
    // Tampilkan konfirmasi
    setShowConfirmation(true);
    setShowForm(false);
    
    // Reset form
    setFormData({
      nama: '',
      kelas: '',
      jumlah: 1
    });
  };

  const sendToTelegram = async (data) => {
    const BOT_TOKEN = '8053296747:AAETgS_3c_-EOdVkNNWdsGaadKQMW1Wxzio'; // Ganti dengan token bot Anda dari BotFather
    const CHAT_ID = '1469657127';     // Ganti dengan chat ID Anda
    
    const message = `
ðŸ“ PESANAN BARU ðŸ“
Nama: ${data.nama}
Kelas: ${data.kelas}
Jumlah: ${data.jumlah}
Total: Rp ${data.total.toLocaleString()}
Waktu: ${data.waktu}
    `;
    
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      });
    } catch (error) {
      console.error('Error sending to Telegram:', error);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  // Styles untuk animasi
  const fadeIn = {
    animation: 'fadeIn 0.3s ease-out forwards'
  };
  
  const slideIn = {
    animation: 'slideIn 0.4s ease-out forwards'
  };
  
  const bounce = {
    animation: 'bounce 0.5s ease-out'
  };

  // CSS untuk animasi
  const animationCSS = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(-20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes bounce {
      0% { transform: scale(0.8); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 50;
      animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.4s ease-out;
    }
    
    .confirmation-modal {
      animation: bounce 0.5s ease-out;
    }
  `;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      {/* Tambahkan style untuk animasi */}
      <style>{animationCSS}</style>
      
      <div style={{width: '100%', maxWidth: '500px'}}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#6b46c1'
        }}>
          Formulir Pemesanan
        </h1>
        
        {/* Animasi Tombol */}
        <div style={{
          transition: 'all 1s ease',
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? 'translateY(0)' : 'translateY(20px)'
        }}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Click di sini untuk membeli
            </button>
            
            <button
              onClick={() => {
                setShowData(!showData);
                if (!showData) fetchAllData();
              }}
              style={{
                background: 'linear-gradient(to right, #2dd4bf, #0ea5e9)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Lihat data yang terdaftar saat ini
            </button>
          </div>
        </div>

        {/* Form Modal dengan animasi yang lebih baik */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 600, color: '#1f2937'}}>
                  Silahkan isi data di bawah ini
                </h2>
                <button 
                  onClick={() => setShowForm(false)}
                  style={{color: '#6b7280', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}
                >
                  âœ•
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '1rem'}}>
                  <label style={{display: 'block', color: '#4b5563', marginBottom: '0.5rem'}}>
                    Masukkan nama anda
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                
                <div style={{marginBottom: '1rem'}}>
                  <label style={{display: 'block', color: '#4b5563', marginBottom: '0.5rem'}}>
                    Masukkan kelas anda
                  </label>
                  <input
                    type="text"
                    name="kelas"
                    value={formData.kelas}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', color: '#4b5563', marginBottom: '0.5rem'}}>
                    Masukkan jumlah beli anda
                  </label>
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleChange}
                    min="1"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                
                <div style={{
                  marginBottom: '1.5rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#f5f3ff', 
                  borderRadius: '0.375rem'
                }}>
                  <p style={{fontWeight: 500}}>
                    Total yang harus anda bayar = 
                    <span style={{color: '#6d28d9', fontWeight: 700}}> Rp {(formData.jumlah * hargaSatuan).toLocaleString()}</span>
                  </p>
                </div>
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal dengan animasi bounce */}
        {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal-content confirmation-modal">
              <div style={{textAlign: 'center'}}>
                <div style={{
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: '#d1fae5',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <svg style={{width: '2rem', height: '2rem', color: '#10b981'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Data anda telah di kirim!!!
                </h2>
                
                <button
                  onClick={closeConfirmation}
                  style={{
                    background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data yang terdaftar dari Firebase */}
        {showData && (
          <div style={{
            marginTop: '2rem',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Data yang terdaftar saat ini:
            </h2>
            
            {loading ? (
              <p style={{textAlign: 'center', padding: '1rem'}}>Memuat data...</p>
            ) : allData.length > 0 ? (
              allData.map((data, index) => (
                <div key={index} style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  border: '1px solid #ede9fe',
                  borderRadius: '0.375rem',
                  backgroundColor: '#f5f3ff'
                }}>
                  <p><span style={{fontWeight: 500}}>Nama:</span> {data.nama}</p>
                  <p><span style={{fontWeight: 500}}>Kelas:</span> {data.kelas}</p>
                  <p><span style={{fontWeight: 500}}>Jumlah:</span> {data.jumlah}</p>
                  <p><span style={{fontWeight: 500}}>Total:</span> Rp {data.total.toLocaleString()}</p>
                  <p><span style={{fontWeight: 500}}>Waktu:</span> {data.waktu}</p>
                </div>
              ))
            ) : (
              <p style={{color: '#6b7280', fontStyle: 'italic'}}>
                Belum ada data yang terdaftar.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
