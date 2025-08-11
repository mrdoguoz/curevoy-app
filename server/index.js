const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// Server başlatma
app.listen(PORT, () => {
  console.log(`🚀 Curevoy Server ${PORT} portunda çalışıyor`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
}); 