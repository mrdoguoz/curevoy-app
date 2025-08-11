import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';
import './ServicePage.css';

const HairTransplantPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [treatments, setTreatments] = useState<string[]>([]);

  useEffect(() => {
    // Hardcoded treatments based on language
    const treatmentsByLanguage = {
      tr: [
        "FUE (Follicular Unit Extraction)",
        "DHI (Direct Hair Implantation)",
        "Sapphire FUE",
        "Sakal Ektirme",
        "Kaş Ektirme",
        "Bıyık Ektirme",
        "Saç Çizgisi Tasarımı",
        "PRP Tedavisi"
      ],
      en: [
        "FUE (Follicular Unit Extraction)",
        "DHI (Direct Hair Implantation)",
        "Sapphire FUE",
        "Beard Transplant",
        "Eyebrow Transplant",
        "Mustache Transplant",
        "Hairline Design",
        "PRP Treatment"
      ],
      ar: [
        "FUE (استخراج الوحدات الجريبية)",
        "DHI (زراعة الشعر المباشرة)",
        "Sapphire FUE",
        "زراعة اللحية",
        "زراعة الحواجب",
        "زراعة الشارب",
        "تصميم خط الشعر",
        "علاج PRP"
      ],
      ru: [
        "FUE (Экстракция фолликулярных единиц)",
        "DHI (Прямая имплантация волос)",
        "Sapphire FUE",
        "Пересадка бороды",
        "Пересадка бровей",
        "Пересадка усов",
        "Дизайн линии роста волос",
        "PRP лечение"
      ],
      fr: [
        "FUE (Extraction d'unités folliculaires)",
        "DHI (Implantation directe de cheveux)",
        "Sapphire FUE",
        "Greffe de barbe",
        "Greffe de sourcils",
        "Greffe de moustache",
        "Design de la ligne de cheveux",
        "Traitement PRP"
      ],
      de: [
        "FUE (Follikuläre Einheitsextraktion)",
        "DHI (Direkte Haartransplantation)",
        "Sapphire FUE",
        "Barttransplantation",
        "Augenbrauentransplantation",
        "Schnurrbarttransplantation",
        "Haarliniendesign",
        "PRP-Behandlung"
      ],
      es: [
        "FUE (Extracción de unidades foliculares)",
        "DHI (Implantación directa de cabello)",
        "Sapphire FUE",
        "Trasplante de barba",
        "Trasplante de cejas",
        "Trasplante de bigote",
        "Diseño de línea de cabello",
        "Tratamiento PRP"
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
            <div className="service-icon">{t('services.hairTransplant.icon')}</div>
            <h1 className="hero-title">{t('services.hairTransplant.title')}</h1>
            <p className="hero-subtitle">{t('services.hairTransplant.description')}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">30+</span>
                <span className="stat-label">{t('servicePages.hero.stats.doctors')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">5000+</span>
                <span className="stat-label">{t('servicePages.hero.stats.treatments')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
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
                  <span className="info-value">4-8 saat</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.hospitalStay')}:</span>
                  <span className="info-value">1 gün</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.recoveryTime')}:</span>
                  <span className="info-value">1-2 hafta</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.priceRange')}:</span>
                  <span className="info-value">€1,500 - €4,000</span>
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
                    <span>hair@curevoy.com</span>
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
                <img src="/images/doctor7.jpg" alt="Dr. Ali Yıldız" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Ali Yıldız</h3>
                <p className="doctor-specialty">Saç Ektirme Uzmanı</p>
                <p className="doctor-experience">18+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>2000+ {t('servicePages.doctors.operations')}</span>
                  <span>96% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor8.jpg" alt="Dr. Zeynep Arslan" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Zeynep Arslan</h3>
                <p className="doctor-specialty">DHI Uzmanı</p>
                <p className="doctor-experience">14+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>1500+ {t('servicePages.doctors.operations')}</span>
                  <span>95% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor9.jpg" alt="Dr. Mustafa Çelik" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Mustafa Çelik</h3>
                <p className="doctor-specialty">Sakal Ektirme Uzmanı</p>
                <p className="doctor-experience">12+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>800+ {t('servicePages.doctors.operations')}</span>
                  <span>94% {t('servicePages.doctors.success')}</span>
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
              <p>"FUE saç ektirme işlemim çok başarılı geçti. 6 ay sonra sonuçlar mükemmel."</p>
              <div className="testimonial-author">
                <strong>Ahmed Al-Rashid</strong>
                <span>Suudi Arabistan - FUE</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"DHI tekniği ile saç ektirme yaptırdım. Doktorum çok deneyimliydi."</p>
              <div className="testimonial-author">
                <strong>John Smith</strong>
                <span>İngiltere - DHI</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Sakal ektirme işlemim için geldim. Sonuçtan çok memnunum."</p>
              <div className="testimonial-author">
                <strong>Mohammed Hassan</strong>
                <span>Mısır - Sakal Ektirme</span>
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

export default HairTransplantPage; 