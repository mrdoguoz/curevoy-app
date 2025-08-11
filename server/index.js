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
mongoose.connect('mongodb://localhost:27017/curevoy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch(err => {
  console.error('❌ MongoDB bağlantı hatası:', err.message);
  console.error('MongoDB çalışıyor mu kontrol edin: mongod');
});

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Curevoy API çalışıyor!' });
});

// Ana route
app.get('/api', async (req, res) => {
  try {
    // Tüm randevuları getir
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    
    // Son 10 kaydı al
    const recentAppointments = appointments.slice(0, 10);
    
    res.json({ 
      message: 'Curevoy Sağlık Turizmi API',
      version: '1.0.0',
      status: 'Çalışıyor',
      totalAppointments: appointments.length,
      recentAppointments: recentAppointments.map(apt => ({
        id: apt._id,
        fullName: apt.fullName,
        email: apt.email,
        phone: apt.phone,
        country: apt.country,
        serviceType: apt.serviceType,
        appointmentDate: apt.appointmentDate,
        preferredTime: apt.preferredTime,
        healthStatus: apt.healthStatus,
        contactMethods: apt.contactMethods,
        languagePreference: apt.languagePreference,
        isEmergency: apt.isEmergency,
        status: apt.status,
        createdAt: apt.createdAt,
        updatedAt: apt.updatedAt
      }))
    });
  } catch (error) {
    console.error('❌ Ana route hatası:', error.message);
    res.status(500).json({
      message: 'Curevoy Sağlık Turizmi API',
      version: '1.0.0',
      status: 'Hata',
      error: error.message
    });
  }
});

// Appointment Routes
app.post('/api/appointments', async (req, res) => {
  try {
    const appointmentData = req.body;
    console.log('📝 Gelen randevu verisi:', {
      fullName: appointmentData.fullName,
      email: appointmentData.email,
      serviceType: appointmentData.serviceType,
      appointmentDate: appointmentData.appointmentDate,
      contactMethods: appointmentData.contactMethods
    });
    
    // Create new appointment
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    console.log('✅ Yeni randevu başarıyla MongoDB\'ye kaydedildi:');
    console.log('   - ID:', appointment._id);
    console.log('   - Ad Soyad:', appointment.fullName);
    console.log('   - Hizmet:', appointment.serviceType);
    console.log('   - Tarih:', appointment.appointmentDate);
    console.log('   - Oluşturulma:', appointment.createdAt);
    
    res.status(201).json({
      success: true,
      message: 'Randevu başarıyla oluşturuldu',
      appointmentId: appointment._id
    });
  } catch (error) {
    console.error('❌ Randevu kaydetme hatası:', error.message);
    console.error('❌ Hata detayları:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.error('❌ Validasyon hataları:', validationErrors);
      res.status(400).json({
        success: false,
        message: 'Randevu kaydedilirken bir hata oluştu: ' + validationErrors.join(', ')
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Randevu kaydedilirken bir hata oluştu: ' + error.message
      });
    }
  }
});

// Get all appointments (for admin use)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    console.log('📊 Toplam randevu sayısı:', appointments.length);
    console.log('📋 Son randevular:', appointments.slice(0, 3).map(apt => ({
      id: apt._id,
      name: apt.fullName,
      service: apt.serviceType,
      date: apt.appointmentDate,
      createdAt: apt.createdAt
    })));
    res.json({
      success: true,
      count: appointments.length,
      appointments: appointments
    });
  } catch (error) {
    console.error('❌ Randevuları getirme hatası:', error.message);
    res.status(500).json({
      success: false,
      message: 'Randevular getirilirken bir hata oluştu'
    });
  }
});

// Get appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Randevu bulunamadı'
      });
    }
    res.json({
      success: true,
      appointment: appointment
    });
  } catch (error) {
    console.error('❌ Randevu getirme hatası:', error.message);
    res.status(500).json({
      success: false,
      message: 'Randevu getirilirken bir hata oluştu'
    });
  }
});

// Update appointment status
app.patch('/api/appointments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Randevu bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Randevu durumu güncellendi',
      appointment: appointment
    });
  } catch (error) {
    console.error('❌ Randevu güncelleme hatası:', error.message);
    res.status(500).json({
      success: false,
      message: 'Randevu güncellenirken bir hata oluştu'
    });
  }
});

// Server başlatma
app.listen(PORT, () => {
  console.log(`🚀 Curevoy Server ${PORT} portunda çalışıyor`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`📅 Appointment API: http://localhost:${PORT}/api/appointments`);
}); 