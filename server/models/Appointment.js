const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Ad soyad zorunludur'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-posta zorunludur'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Telefon numarası zorunludur'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Ülke zorunludur'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Doğum tarihi zorunludur']
  },
  serviceType: {
    type: String,
    required: [true, 'Hizmet türü zorunludur'],
    enum: ['cardiology', 'dental', 'hairTransplant', 'rhinoplasty']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Randevu tarihi zorunludur']
  },
  preferredTime: {
    type: String,
    required: [true, 'Tercih edilen saat zorunludur']
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  healthStatus: {
    type: String,
    required: [true, 'Sağlık durumu zorunludur'],
    trim: true
  },
  medications: {
    type: String,
    trim: true,
    default: ''
  },
  allergies: {
    type: String,
    trim: true,
    default: ''
  },
  previousTreatments: {
    type: String,
    trim: true,
    default: ''
  },
  contactMethods: {
    type: [String],
    required: [true, 'En az bir iletişim yöntemi seçilmelidir'],
    enum: ['email', 'whatsapp']
  },
  languagePreference: {
    type: String,
    default: 'English',
    enum: ['English', 'Turkish', 'Arabic', 'Russian', 'French', 'German', 'Spanish']
  },
  additionalNotes: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Pre-save middleware to update updatedAt
appointmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for formatted appointment date
appointmentSchema.virtual('formattedAppointmentDate').get(function() {
  return this.appointmentDate.toLocaleDateString('tr-TR');
});

// Virtual for formatted birth date
appointmentSchema.virtual('formattedBirthDate').get(function() {
  return this.dateOfBirth.toLocaleDateString('tr-TR');
});

// Ensure virtuals are serialized
appointmentSchema.set('toJSON', { virtuals: true });
appointmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

