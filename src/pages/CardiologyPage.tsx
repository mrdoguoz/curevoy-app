import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';
import './ServicePage.css';

const CardiologyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [treatments, setTreatments] = useState<string[]>([]);

  useEffect(() => {
    // Hardcoded treatments based on language
    const treatmentsByLanguage = {
      tr: [
        "Koroner Anjiyografi",
        "Koroner Stent İşlemleri",
        "Kalp Pili İmplantasyonu",
        "Kardiyak Ablasyon",
        "Kalp Kapak Hastalıkları Tedavisi",
        "Kalp Yetmezliği Tedavisi",
        "Hipertansiyon Tedavisi",
        "Ritim Bozuklukları Tedavisi"
      ],
      en: [
        "Coronary Angiography",
        "Coronary Stent Procedures",
        "Pacemaker Implantation",
        "Cardiac Ablation",
        "Heart Valve Disease Treatment",
        "Heart Failure Treatment",
        "Hypertension Treatment",
        "Arrhythmia Treatment"
      ],
      ar: [
        "قسطرة القلب التاجية",
        "إجراءات دعامة القلب التاجية",
        "زراعة جهاز تنظيم ضربات القلب",
        "الاستئصال القلبي",
        "علاج أمراض صمامات القلب",
        "علاج قصور القلب",
        "علاج ارتفاع ضغط الدم",
        "علاج اضطرابات النظم"
      ],
      ru: [
        "Коронарная Ангиография",
        "Коронарное Стентирование",
        "Имплантация Кардиостимулятора",
        "Катетерная Абляция",
        "Лечение Заболеваний Клапанов Сердца",
        "Лечение Сердечной Недостаточности",
        "Лечение Гипертонии",
        "Лечение Аритмии"
      ],
      fr: [
        "Angiographie Coronarienne",
        "Procédures de Stent Coronarien",
        "Implantation de Stimulateur Cardiaque",
        "Ablation Cardiaque",
        "Traitement des Maladies Valvulaires",
        "Traitement de l'Insuffisance Cardiaque",
        "Traitement de l'Hypertension",
        "Traitement des Arythmies"
      ],
      de: [
        "Koronare Angiographie",
        "Koronare Stent-Verfahren",
        "Schrittmacher-Implantation",
        "Kardiale Ablation",
        "Herzklappenerkrankungen-Behandlung",
        "Herzinsuffizienz-Behandlung",
        "Hypertonie-Behandlung",
        "Arrhythmie-Behandlung"
      ],
      es: [
        "Angiografía Coronaria",
        "Procedimientos de Stent Coronario",
        "Implantación de Marcapasos",
        "Ablación Cardíaca",
        "Tratamiento de Enfermedades Valvulares",
        "Tratamiento de Insuficiencia Cardíaca",
        "Tratamiento de Hipertensión",
        "Tratamiento de Arritmias"
      ]
    };

    setTreatments(treatmentsByLanguage[i18n.language as keyof typeof treatmentsByLanguage] || treatmentsByLanguage.en);
  }, [i18n.language]);

  const goBackToServices = () => {
    window.history.back();
  };

  const openAppointmentForm = () => {
    setShowAppointmentForm(true);
  };

  const closeAppointmentForm = () => {
    setShowAppointmentForm(false);
  };

  const handleAppointmentSubmit = (data: any) => {
    console.log('Appointment submitted:', data);
    closeAppointmentForm();
  };

  if (showAppointmentForm) {
    return (
      <AppointmentForm 
        onClose={closeAppointmentForm}
        onSubmit={handleAppointmentSubmit}
      />
    );
  }

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="service-icon">{t('services.cardiology.icon')}</div>
            <h1 className="hero-title">{t('services.cardiology.title')}</h1>
            <p className="hero-subtitle">{t('services.cardiology.description')}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">{t('servicePages.hero.stats.doctors')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">{t('servicePages.hero.stats.treatments')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">{t('servicePages.hero.stats.successRate')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet Detayları */}
      <section className="service-details">
        <div className="container">
          <div className="details-grid">
            <div className="details-content">
              <button onClick={goBackToServices} className="back-button">
                ← {t('servicePages.backToServices', 'Hizmetlere Dön')}
              </button>
              
              <h2>{t('servicePages.details.title')}</h2>
              <p>
                {t('servicePages.details.description')}
              </p>
              
              <h3>{t('servicePages.details.treatments')}</h3>
              <ul className="treatment-list">
                {treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>

              <h3>{t('servicePages.details.whyTurkey')}</h3>
              <div className="benefits-grid">
                <div className="benefit">
                  <div className="benefit-icon">🏥</div>
                  <h4>{t('servicePages.details.benefits.modernHospitals.title')}</h4>
                  <p>{t('servicePages.details.benefits.modernHospitals.description')}</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">👨‍⚕️</div>
                  <h4>{t('servicePages.details.benefits.expertDoctors.title')}</h4>
                  <p>{t('servicePages.details.benefits.expertDoctors.description')}</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">💰</div>
                  <h4>{t('servicePages.details.benefits.affordablePrices.title')}</h4>
                  <p>{t('servicePages.details.benefits.affordablePrices.description')}</p>
                </div>
                <div className="benefit">
                  <div className="benefit-icon">🌍</div>
                  <h4>{t('servicePages.details.benefits.easyAccess.title')}</h4>
                  <p>{t('servicePages.details.benefits.easyAccess.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="details-sidebar">
              <div className="info-card">
                <h3>{t('servicePages.infoCard.title')}</h3>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.treatmentDuration')}:</span>
                  <span className="info-value">1-7 {t('timeUnits.days', 'gün')}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.hospitalStay')}:</span>
                  <span className="info-value">1-3 {t('timeUnits.days', 'gün')}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.recoveryTime')}:</span>
                  <span className="info-value">1-4 {t('timeUnits.weeks', 'hafta')}</span>
                </div>
                <button onClick={openAppointmentForm} className="btn btn-primary btn-large">
                  {t('servicePages.infoCard.bookAppointment', 'Randevu Al')}
                </button>
              </div>

              <div className="consultation-card">
                <h3>{t('servicePages.consultation.title', 'WhatsApp ile İletişim')}</h3>
                <p>{t('servicePages.consultation.description')}</p>
                <a 
                  href="https://wa.me/905516362773" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  {t('servicePages.consultation.whatsapp', 'WhatsApp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uzman Doktorlarımız */}
      <section className="doctors-section">
        <div className="container">
          <h2>{t('servicePages.doctors.title', 'Uzman Doktorlarımız')}</h2>
          <div className="doctors-grid">
            <div className="doctor-card">
              <div className="doctor-avatar">👨‍⚕️</div>
              <h3>Dr. Ahmet Yılmaz</h3>
              <p className="doctor-specialty">{t('servicePages.doctors.specialties.cardiology', 'Kardiyoloji Uzmanı')}</p>
              <p className="doctor-experience">15 {t('servicePages.doctors.year', 'yıl')} deneyim</p>
              <button className="btn btn-outline">{t('servicePages.doctors.viewProfile', 'Profili Görüntüle')}</button>
            </div>
            <div className="doctor-card">
              <div className="doctor-avatar">👩‍⚕️</div>
              <h3>Dr. Fatma Demir</h3>
              <p className="doctor-specialty">{t('servicePages.doctors.specialties.interventionalCardiology', 'Girişimsel Kardiyoloji')}</p>
              <p className="doctor-experience">12 {t('servicePages.doctors.year', 'yıl')} deneyim</p>
              <button className="btn btn-outline">{t('servicePages.doctors.viewProfile', 'Profili Görüntüle')}</button>
            </div>
            <div className="doctor-card">
              <div className="doctor-avatar">👨‍⚕️</div>
              <h3>Dr. Mehmet Kaya</h3>
              <p className="doctor-specialty">{t('servicePages.doctors.specialties.arrhythmia', 'Ritim Bozuklukları')}</p>
              <p className="doctor-experience">18 {t('servicePages.doctors.year', 'yıl')} deneyim</p>
              <button className="btn btn-outline">{t('servicePages.doctors.viewProfile', 'Profili Görüntüle')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hasta Yorumları */}
      <section className="testimonials-section">
        <div className="container">
          <h2>{t('servicePages.testimonials.title', 'Hasta Yorumları')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.cardiology.testimonial1.text', 'Koroner stent işlemim çok başarılı geçti. Doktorum ve ekibi çok profesyoneldi. Tedavi sonrası takip de mükemmeldi.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.cardiology.testimonial1.author', 'John Smith')}</strong>
                <span>{t('servicePages.testimonials.cardiology.testimonial1.location', 'İngiltere - Koroner Stent')}</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.cardiology.testimonial2.text', 'Kalp pili takılması için Türkiye\'yi seçtim. Hem tedavi hem de konaklama çok iyiydi. Kesinlikle tavsiye ederim.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.cardiology.testimonial2.author', 'Maria Garcia')}</strong>
                <span>{t('servicePages.testimonials.cardiology.testimonial2.location', 'İspanya - Kalp Pili')}</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.cardiology.testimonial3.text', 'Ritim bozukluğu tedavim için geldim. Ablasyon işlemi başarılı oldu ve artık sorun yaşamıyorum.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.cardiology.testimonial3.author', 'Ahmed Hassan')}</strong>
                <span>{t('servicePages.testimonials.cardiology.testimonial3.location', 'Mısır - Ablasyon')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardiologyPage; 