import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentForm from '../components/AppointmentForm';
import './ServicePage.css';

const DentalPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [treatments, setTreatments] = useState<string[]>([]);

  useEffect(() => {
    // Hardcoded treatments based on language
    const treatmentsByLanguage = {
      tr: [
        "İmplant Tedavisi",
        "Zirkonyum Kaplama",
        "Laminate Veneer",
        "Ortodonti (Diş Teli)",
        "Kanal Tedavisi",
        "Diş Beyazlatma",
        "Gülüş Tasarımı",
        "Diş Eti Tedavisi"
      ],
      en: [
        "Implant Treatment",
        "Zirconium Coating",
        "Laminate Veneer",
        "Orthodontics (Braces)",
        "Root Canal Treatment",
        "Teeth Whitening",
        "Smile Design",
        "Gum Treatment"
      ],
      ar: [
        "علاج الزراعة",
        "تلبيس الزركونيوم",
        "الفينير",
        "تقويم الأسنان",
        "علاج العصب",
        "تبييض الأسنان",
        "تصميم الابتسامة",
        "علاج اللثة"
      ],
      ru: [
        "Имплантационное лечение",
        "Циркониевое покрытие",
        "Ламинат-виниры",
        "Ортодонтия (брекеты)",
        "Лечение корневых каналов",
        "Отбеливание зубов",
        "Дизайн улыбки",
        "Лечение десен"
      ],
      fr: [
        "Traitement d'implant",
        "Revêtement en zircone",
        "Facettes en céramique",
        "Orthodontie (bagues)",
        "Traitement de canal",
        "Blanchiment des dents",
        "Design du sourire",
        "Traitement des gencives"
      ],
      de: [
        "Implantatbehandlung",
        "Zirkoniumbeschichtung",
        "Keramikverblendung",
        "Kieferorthopädie (Zahnspangen)",
        "Wurzelkanalbehandlung",
        "Zahnaufhellung",
        "Lächeldesign",
        "Zahnfleischbehandlung"
      ],
      es: [
        "Tratamiento de implantes",
        "Recubrimiento de circonio",
        "Carillas de porcelana",
        "Ortodoncia (brackets)",
        "Tratamiento de conducto",
        "Blanqueamiento dental",
        "Diseño de sonrisa",
        "Tratamiento de encías"
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
            <div className="service-icon">{t('services.dental.icon')}</div>
            <h1 className="hero-title">{t('services.dental.title')}</h1>
            <p className="hero-subtitle">{t('services.dental.description')}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">40+</span>
                <span className="stat-label">{t('servicePages.hero.stats.doctors')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">2000+</span>
                <span className="stat-label">{t('servicePages.hero.stats.treatments')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
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
                  <span className="info-value">1-7 gün</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.hospitalStay')}:</span>
                  <span className="info-value">1-2 gün</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.recoveryTime')}:</span>
                  <span className="info-value">1-2 hafta</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('servicePages.infoCard.priceRange')}:</span>
                  <span className="info-value">€500 - €5,000</span>
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
                    <span>dental@curevoy.com</span>
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
                <img src="/images/doctor4.jpg" alt="Dr. Ayşe Demir" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Ayşe Demir</h3>
                <p className="doctor-specialty">İmplant Uzmanı</p>
                <p className="doctor-experience">15+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>800+ {t('servicePages.doctors.operations')}</span>
                  <span>99% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor5.jpg" alt="Dr. Mehmet Kaya" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Mehmet Kaya</h3>
                <p className="doctor-specialty">Ortodonti Uzmanı</p>
                <p className="doctor-experience">12+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>600+ {t('servicePages.doctors.operations')}</span>
                  <span>98% {t('servicePages.doctors.success')}</span>
                </div>
                <button className="btn btn-outline">{t('servicePages.doctors.viewProfile')}</button>
              </div>
            </div>
            
            <div className="doctor-card">
              <div className="doctor-image">
                <img src="/images/doctor6.jpg" alt="Dr. Fatma Özkan" />
              </div>
              <div className="doctor-info">
                <h3>Dr. Fatma Özkan</h3>
                <p className="doctor-specialty">Estetik Diş Hekimi</p>
                <p className="doctor-experience">10+ yıl {t('servicePages.doctors.experience')}</p>
                <div className="doctor-stats">
                  <span>500+ {t('servicePages.doctors.operations')}</span>
                  <span>97% {t('servicePages.doctors.success')}</span>
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
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.dental.testimonial1.text', 'İmplant tedavim çok başarılı geçti. Doktorum çok deneyimliydi ve sonuçtan çok memnunum.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.dental.testimonial1.author', 'Emma Wilson')}</strong>
                <span>{t('servicePages.testimonials.dental.testimonial1.location', 'Almanya - İmplant')}</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.dental.testimonial2.text', 'Zirkonyum kaplama işlemim mükemmel oldu. Hem estetik hem de fonksiyonel olarak çok iyi.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.dental.testimonial2.author', 'Carlos Rodriguez')}</strong>
                <span>{t('servicePages.testimonials.dental.testimonial2.location', 'İspanya - Zirkonyum')}</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('servicePages.testimonials.dental.testimonial3.text', 'Ortodonti tedavim için Türkiye\'yi seçtim. Tedavi süreci çok profesyoneldi.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('servicePages.testimonials.dental.testimonial3.author', 'Anna Kowalski')}</strong>
                <span>{t('servicePages.testimonials.dental.testimonial3.location', 'Polonya - Ortodonti')}</span>
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
              <button onClick={openAppointmentForm} className="btn btn-primary btn-large">{t('servicePages.cta.bookAppointment')}</button>
              <button className="btn btn-secondary btn-large">{t('servicePages.cta.freeConsultation')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DentalPage; 