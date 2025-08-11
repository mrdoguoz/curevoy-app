const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Appointment model
const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable bulunamadı!');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch(err => console.error('❌ MongoDB bağlantı hatası:', err.message));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Curevoy API çalışıyor!' });
});

// Ana route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Curevoy Sağlık Turizmi API',
    version: '1.0.0',
    status: 'Çalışıyor'
  });
});

// Appointment Routes
app.post('/api/appointments', async (req, res) => {
  try {
    const appointmentData = req.body;
    console.log('📝 Gelen randevu verisi:', appointmentData);
    
    // Create new appointment
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    console.log('✅ Yeni randevu başarıyla MongoDB\'ye kaydedildi:', appointment._id);
    
    res.status(201).json({
      success: true,
      message: 'Randevu başarıyla oluşturuldu',
      appointmentId: appointment._id
    });
  } catch (error) {
    console.error('❌ Randevu kaydetme hatası:', error.message);
    res.status(500).json({
      success: false,
      message: 'Randevu kaydedilirken bir hata oluştu: ' + error.message
    });
  }
});

// Server başlatma
app.listen(PORT, () => {
  console.log(`🚀 Curevoy Server ${PORT} portunda çalışıyor`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
}); 