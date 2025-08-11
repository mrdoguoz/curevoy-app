import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';
import './ServicePage.css';

const RhinoplastyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [treatments, setTreatments] = useState<string[]>([]);

  useEffect(() => {
    // Hardcoded treatments based on language
    const treatmentsByLanguage = {
      tr: [
        "Kapalı Rinoplasti",
        "Açık Rinoplasti",
        "Burun Ucu Estetiği",
        "Burun Kemeri Düzeltme",
        "Burun Delikleri Küçültme",
        "Burun Asimetrisi Düzeltme",
        "Burun Tabanı Genişletme",
        "Revizyon Rinoplasti"
      ],
      en: [
        "Closed Rhinoplasty",
        "Open Rhinoplasty",
        "Tip Rhinoplasty",
        "Bridge Correction",
        "Nostril Reduction",
        "Asymmetry Correction",
        "Base Widening",
        "Revision Rhinoplasty"
      ],
      ar: [
        "تجميل الأنف المغلق",
        "تجميل الأنف المفتوح",
        "تجميل طرف الأنف",
        "تصحيح جسر الأنف",
        "تصغير فتحات الأنف",
        "تصحيح عدم التناسق",
        "توسيع قاعدة الأنف",
        "تجميل الأنف التصحيحي"
      ],
      ru: [
        "Закрытая ринопластика",
        "Открытая ринопластика",
        "Пластика кончика носа",
        "Коррекция спинки носа",
        "Уменьшение ноздрей",
        "Коррекция асимметрии",
        "Расширение основания",
        "Ревизионная ринопластика"
      ],
      fr: [
        "Rhinoplastie fermée",
        "Rhinoplastie ouverte",
        "Rhinoplastie de la pointe",
        "Correction de l'arête",
        "Réduction des narines",
        "Correction de l'asymétrie",
        "Élargissement de la base",
        "Rhinoplastie de révision"
      ],
      de: [
        "Geschlossene Rhinoplastik",
        "Offene Rhinoplastik",
        "Nasenspitzenplastik",
        "Nasenrückenkorrektur",
        "Nasenlochverkleinerung",
        "Asymmetriekorrektur",
        "Basisverbreiterung",
        "Revisionsrhinoplastik"
      ],
      es: [
        "Rinoplastia cerrada",
        "Rinoplastia abierta",
        "Rinoplastia de punta",
        "Corrección del puente",
        "Reducción de fosas nasales",
        "Corrección de asimetría",
        "Ensanchamiento de base",
        "Rinoplastia de revisión"
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
            <div className="service-icon">{t('services.rhinoplasty.icon')}</div>
            <h1 className="hero-title">{t('services.rhinoplasty.title')}</h1>
            <p className="hero-subtitle">{t('services.rhinoplasty.description')}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">{t('servicePages.hero.stats.doctors')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">3000+</span>
                <span className="stat-label">{t('servicePages.hero.stats.treatments')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">97%</span>
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
                  <span className="info-value">2-4 saat</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.hospitalStay')}:</span>
                  <span className="info-value">1 gün</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.recoveryTime')}:</span>
                  <span className="info-value">2-4 hafta</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.priceRange')}:</span>
                  <span className="info-value">€2,500 - €6,000</span>
                </div>
                <button onClick={openAppointmentForm} className="btn btn-primary btn-large">
                  {t('servicePages.infoCard.bookAppointment', 'Randevu Al')}
                </button>
              </div>

              <div className="contact-card">
                <h3>{t('servicePages.consultation.title')}</h3>
                <p>{t('servicePages.consultation.description')}</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>{t('contact.info.phoneNumber')}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>rhinoplasty@curevoy.com</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-full">{t('servicePages.consultation.whatsapp')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doktorlar Bölümü */}
      <section className="doctors-section">
        <div className="container">
          <h2 className="section-title">{t('servicePages.doctors.title')}</h2>
          <div className="doctors-grid">
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor10.jpg" alt="Dr. Emre Özkan" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Emre Özkan</h3>
                <p className="doctor-specialty">Plastik Cerrahi Uzmanı</p>
                <p className="doctor-experience">20+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>1500+ {t('servicePages.doctors.operations')}</span>
                  <span>98% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor11.jpg" alt="Dr. Seda Yılmaz" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Seda Yılmaz</h3>
                <p className="doctor-specialty">Estetik Cerrahi Uzmanı</p>
                <p className="doctor-experience">16+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>1200+ {t('servicePages.doctors.operations')}</span>
                  <span>97% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor12.jpg" alt="Dr. Can Demir" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Can Demir</h3>
                <p className="doctor-specialty">Burun Estetiği Uzmanı</p>
                <p className="doctor-experience">14+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>900+ {t('servicePages.doctors.operations')}</span>
                  <span>96% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hasta Yorumları */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">{t('servicePages.testimonials.title')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Rinoplasti operasyonum çok başarılı geçti. Doktorum çok profesyoneldi."</p>
              <div className="testimonial-author">
                <strong>Maria Rodriguez</strong>
                <span>İspanya - Rinoplasti</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Burun estetiği için Türkiye'yi seçtim. Sonuçtan çok memnunum."</p>
              <div className="testimonial-author">
                <strong>Anna Kowalski</strong>
                <span>Polonya - Burun Estetiği</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Kapalı rinoplasti yaptırdım. İyileşme süreci çok hızlıydı."</p>
              <div className="testimonial-author">
                <strong>Lucas Silva</strong>
                <span>Brezilya - Kapalı Rinoplasti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('servicePages.cta.title')}</h2>
            <p>{t('servicePages.cta.description')}</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">{t('servicePages.cta.bookAppointment')}</button>
              <button className="btn btn-secondary btn-large">{t('servicePages.cta.freeConsultation')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RhinoplastyPage; 