import React, { useState, useEffect } from 'react';

// Komponen utama
function App() {
  const [showButtons, setShowButtons] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteCode, setDeleteCode] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jumlah: 1,
    kodeRahasia: ''
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
    
    // Generate kode rahasia saat form dibuka
    setFormData(prev => ({
      ...prev,
      kodeRahasia: generateSecretCode()
    }));
    
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

  // Fungsi untuk menghasilkan kode rahasia acak
  const generateSecretCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'jumlah' ? parseInt(value) || 0 : value
    });
  };

  const incrementQuantity = () => {
    setFormData(prev => ({
      ...prev,
      jumlah: prev.jumlah + 1
    }));
  };

  const decrementQuantity = () => {
    if (formData.jumlah > 1) {
      setFormData(prev => ({
        ...prev,
        jumlah: prev.jumlah - 1
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi nama tidak boleh kosong
    if (!formData.nama.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }
    
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
    
    // Reset form tapi simpan kode rahasia untuk ditampilkan di konfirmasi
    const kodeRahasia = formData.kodeRahasia;
    setFormData({
      nama: '',
      kelas: '',
      jumlah: 1,
      kodeRahasia: generateSecretCode() // Generate kode baru untuk pesanan berikutnya
    });
  };

  const sendToTelegram = async (data) => {
    const BOT_TOKEN = '8053296747:AAETgS_3c_-EOdVkNNWdsGaadKQMW1Wxzio'; // Ganti dengan token bot Anda dari BotFather
    const CHAT_ID = '1469657127';     // Ganti dengan chat ID Anda
    
    const message = `
📝 PESANAN BARU 📝
Nama: ${data.nama}
Kelas: ${data.kelas}
Jumlah: ${data.jumlah}
Total: Rp ${data.total.toLocaleString()}
Waktu: ${data.waktu}
Kode Rahasia: ${data.kodeRahasia}
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

  const handleDeleteOrder = async () => {
    if (!deleteCode.trim()) {
      setDeleteError("Kode rahasia tidak boleh kosong!");
      return;
    }
    
    // Cari order dengan kode rahasia yang sesuai
    const orderToDelete = allData.find(order => order.kodeRahasia === deleteCode);
    
    if (!orderToDelete) {
      setDeleteError("Kode rahasia tidak ditemukan!");
      return;
    }
    
    try {
      const response = await fetch(`https://form-telegram-app-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${orderToDelete.id}.json`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert("Pesanan berhasil dihapus!");
        setDeleteCode('');
        setDeleteError('');
        setShowDeleteForm(false);
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      setDeleteError("Terjadi kesalahan saat menghapus data!");
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
    
    .quantity-control {
      display: flex;
      align-items: center;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      overflow: hidden;
    }
    
    .quantity-button {
      background-color: #f3f4f6;
      border: none;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      color: #4b5563;
      transition: background-color 0.2s;
    }
    
    .quantity-button:hover {
      background-color: #e5e7eb;
    }
    
    .quantity-input {
      width: 3rem;
      text-align: center;
      border: none;
      outline: none;
      font-size: 1rem;
      padding: 0.5rem 0;
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
            
            <button
              onClick={() => setShowDeleteForm(true)}
              style={{
                background: 'linear-gradient(to right, #f43f5e, #ec4899)',
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
              Hapus Pesanan
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
                  ✕
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
                  <div className="quantity-control">
                    <button 
                      type="button" 
                      className="quantity-button"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="jumlah"
                      value={formData.jumlah}
                      onChange={handleChange}
                      min="1"
                      className="quantity-input"
                      readOnly
                    />
                    <button 
                      type="button" 
                      className="quantity-button"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                  
                  <div style={{
  marginTop: '0.75rem',
  display: 'flex',
  flexDirection: 'column'
}}>
  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
    <span style={{ fontWeight: 500 }}>Kode rahasia:</span> {formData.kodeRahasia}
    <button
      onClick={() => navigator.clipboard.writeText(formData.kodeRahasia)}
      style={{
        marginLeft: '8px',
        fontSize: '0.75rem',
        padding: '2px 6px',
        cursor: 'pointer',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '4px'
      }}
    >
      Salin
    </button>
  </p>
  <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontStyle: 'italic' }}>
    *Ingatlah code ini, code ini akan diminta saat anda mencoba menghapus data anda
  </p>
</div>
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

        {/* Delete Form Modal */}
        {showDeleteForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 600, color: '#1f2937'}}>
                  Hapus Pesanan
                </h2>
                <button 
                  onClick={() => {
                    setShowDeleteForm(false);
                    setDeleteCode('');
                    setDeleteError('');
                  }}
                  style={{color: '#6b7280', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}
                >
                  ✕
                </button>
              </div>
              
              <div>
                <div style={{marginBottom: '1rem'}}>
                  <label style={{display: 'block', color: '#4b5563', marginBottom: '0.5rem'}}>
                    Masukkan kode rahasia pesanan
                  </label>
                  <input
                    type="text"
                    value={deleteCode}
                    onChange={(e) => setDeleteCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      outline: 'none'
                    }}
                  />
                </div>
                
                {deleteError && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}>
                    {deleteError}
                  </div>
                )}
                
                <button
                  onClick={handleDeleteOrder}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to right, #ef4444, #dc2626)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Hapus Pesanan
                </button>
              </div>
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
            
            {/* Tombol Hubungi Admin */}
            <div style={{
              marginTop: '1.5rem',
              textAlign: 'center'
            }}>
              <a 
                href="https://wa.me/+6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#25D366',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  fontWeight: 500
                }}
              >
                <svg style={{width: '1.25rem', height: '1.25rem'}} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi Admin lewat WA
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;