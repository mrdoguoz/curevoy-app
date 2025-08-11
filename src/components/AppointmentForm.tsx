import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AppointmentForm.css';

interface AppointmentFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  serviceType: string;
  appointmentDate: string;
  preferredTime: string;
  isEmergency: boolean;
  healthStatus: string;
  medications: string;
  allergies: string;
  previousTreatments: string;
  contactMethods: string[];
  languagePreference: string;
  additionalNotes: string;
}

interface AppointmentFormProps {
  onClose: () => void;
  onSubmit?: (data: AppointmentFormData) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    dateOfBirth: '',
    serviceType: '',
    appointmentDate: '',
    preferredTime: '',
    isEmergency: false,
    healthStatus: '',
    medications: '',
    allergies: '',
    previousTreatments: '',
    contactMethods: [],
    languagePreference: 'English',
    additionalNotes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'contactMethods') {
        const method = value;
        setFormData(prev => ({
          ...prev,
          contactMethods: checked 
            ? [...prev.contactMethods, method]
            : prev.contactMethods.filter(m => m !== method)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    // Form validation
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.country || !formData.dateOfBirth) {
        alert('Lütfen tüm zorunlu alanları doldurun.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.serviceType || !formData.appointmentDate || !formData.preferredTime) {
        alert('Lütfen tüm zorunlu alanları doldurun.');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.healthStatus) {
        alert('Lütfen sağlık durumunuzu belirtin.');
        return;
      }
    } else if (currentStep === 4) {
      if (formData.contactMethods.length === 0) {
        alert('Lütfen en az bir iletişim yöntemi seçin.');
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    // Final validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.country || 
        !formData.dateOfBirth || !formData.serviceType || !formData.appointmentDate || 
        !formData.preferredTime || !formData.healthStatus || formData.contactMethods.length === 0) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Randevu talebiniz başarıyla alındı! En kısa sürede size dönüş yapacağız.');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Randevu oluşturulurken bir hata oluştu: ${errorData.message}`);
      }
    } catch (error) {
      alert('Randevu gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>{t('appointment.personalInfo', 'Kişisel Bilgiler')}</h3>
      <div className="form-group">
        <label htmlFor="fullName">{t('appointment.fullName', 'Ad Soyad')} *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">{t('appointment.email', 'E-posta')} *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">{t('appointment.phone', 'Telefon Numarası')} *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">{t('appointment.country', 'Ülke')} *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
          className="form-select"
        >
          <option value="">{t('appointment.selectCountry', 'Ülke Seçin')}</option>
          <option value="Turkey">Türkiye</option>
          <option value="Germany">Almanya</option>
          <option value="England">İngiltere</option>
          <option value="USA">ABD</option>
          <option value="Russia">Rusya</option>
          <option value="France">Fransa</option>
          <option value="Spain">İspanya</option>
          <option value="Other">Diğer</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth">{t('appointment.dateOfBirth', 'Doğum Tarihi')} *</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>{t('appointment.appointmentDetails', 'Randevu Detayları')}</h3>
      <div className="form-group">
        <label htmlFor="serviceType">{t('appointment.serviceType', 'Hizmet Türü')} *</label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          required
          className="form-select"
        >
          <option value="">{t('appointment.selectService', 'Hizmet Seçin')}</option>
          <option value="cardiology">{t('services.cardiology.title', 'Kardiyoloji')}</option>
          <option value="dental">{t('services.dental.title', 'Diş Tedavisi')}</option>
          <option value="hairTransplant">{t('services.hairTransplant.title', 'Saç Ektirme')}</option>
          <option value="rhinoplasty">{t('services.rhinoplasty.title', 'Burun Estetiği')}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="appointmentDate">{t('appointment.appointmentDate', 'Randevu Tarihi')} *</label>
        <input
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="preferredTime">{t('appointment.preferredTime', 'Tercih Edilen Saat')} *</label>
        <select
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleInputChange}
          required
          className="form-select"
        >
          <option value="">{t('appointment.selectTime', 'Saat Seçin')}</option>
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
        </select>
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isEmergency"
            checked={formData.isEmergency}
            onChange={handleInputChange}
            className="form-checkbox"
          />
          {t('appointment.isEmergency', 'Acil Durum')}
        </label>
      </div>
      <div className="form-notice">
        <p>{t('appointment.workingHours', 'Çalışma saatleri: Hafta içi 09:00-17:00')}</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>{t('appointment.healthInfo', 'Sağlık Bilgileri')}</h3>
      <div className="form-group">
        <label htmlFor="healthStatus">{t('appointment.healthStatus', 'Mevcut Sağlık Durumu')} *</label>
        <textarea
          id="healthStatus"
          name="healthStatus"
          value={formData.healthStatus}
          onChange={handleInputChange}
          required
          className="form-textarea"
          placeholder={t('appointment.healthStatusPlaceholder', 'Mevcut sağlık durumunuzu kısaca açıklayın...')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="medications">{t('appointment.medications', 'Kullandığı İlaçlar')}</label>
        <textarea
          id="medications"
          name="medications"
          value={formData.medications}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder={t('appointment.medicationsPlaceholder', 'Şu anda kullandığınız ilaçları listeleyin...')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="allergies">{t('appointment.allergies', 'Alerjiler')}</label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder={t('appointment.allergiesPlaceholder', 'Bilinen alerjilerinizi belirtin...')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="previousTreatments">{t('appointment.previousTreatments', 'Önceki Tedaviler')}</label>
        <textarea
          id="previousTreatments"
          name="previousTreatments"
          value={formData.previousTreatments}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder={t('appointment.previousTreatmentsPlaceholder', 'Daha önce aldığınız tedavileri açıklayın...')}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>{t('appointment.contactPreferences', 'İletişim Tercihleri')}</h3>
      <div className="form-group">
        <label>{t('appointment.contactMethod', 'İletişim Yöntemi')} *</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <span>E-posta</span>
            <input
              type="checkbox"
              name="contactMethods"
              value="email"
              checked={formData.contactMethods.includes('email')}
              onChange={handleInputChange}
              className="form-checkbox"
            />
          </label>
          <label className="checkbox-label">
            <span>WhatsApp</span>
            <input
              type="checkbox"
              name="contactMethods"
              value="whatsapp"
              checked={formData.contactMethods.includes('whatsapp')}
              onChange={handleInputChange}
              className="form-checkbox"
            />
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="languagePreference">{t('appointment.languagePreference', 'Dil Tercihi')}</label>
        <select
          id="languagePreference"
          name="languagePreference"
          value={formData.languagePreference}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="English">English</option>
          <option value="Turkish">Türkçe</option>
          <option value="Arabic">العربية</option>
          <option value="Russian">Русский</option>
          <option value="French">Français</option>
          <option value="German">Deutsch</option>
          <option value="Spanish">Español</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="additionalNotes">{t('appointment.additionalNotes', 'Ek Notlar')}</label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder={t('appointment.additionalNotesPlaceholder', 'Ek bilgiler veya özel isteklerinizi yazın...')}
        />
      </div>
      <div className="form-notice">
        <p>{t('appointment.operatorNotice', 'Randevunuz onaylandıktan sonra operatörümüz sizinle iletişime geçecektir.')}</p>
      </div>
    </div>
  );

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal">
        <div className="modal-header">
          <h2>{t('appointment.title', 'Randevu Al')}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
          <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>4</div>
        </div>

        <div className="modal-content">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div className="modal-actions">
          {currentStep > 1 && (
            <button onClick={prevStep} className="btn btn-secondary">
              {t('appointment.previous', 'Önceki')}
            </button>
          )}
          {currentStep < 4 ? (
            <button onClick={nextStep} className="btn btn-primary">
              {t('appointment.next', 'İleri')}
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary">
              {t('appointment.submit', 'Randevu Talep Et')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
