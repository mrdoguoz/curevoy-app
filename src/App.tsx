import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentForm from './components/AppointmentForm';
import CardiologyPage from './pages/CardiologyPage';
import DentalPage from './pages/DentalPage';
import HairTransplantPage from './pages/HairTransplantPage';
import RhinoplastyPage from './pages/RhinoplastyPage';

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const navigateToService = (service: string) => {
    setCurrentPage(service);
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

  // Ana Sayfa İçeriği
  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {t('hero.title')}
            </h1>
            <p className="hero-description">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">{t('services.cardiology.icon')}</div>
              <h3>{t('services.cardiology.title')}</h3>
              <button 
                className="btn btn-outline"
                onClick={() => navigateToService('cardiology')}
              >
                {t('services.viewDetails')}
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">{t('services.dental.icon')}</div>
              <h3>{t('services.dental.title')}</h3>
              <button 
                className="btn btn-outline"
                onClick={() => navigateToService('dental')}
              >
                {t('services.viewDetails')}
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">{t('services.hairTransplant.icon')}</div>
              <h3>{t('services.hairTransplant.title')}</h3>
              <button 
                className="btn btn-outline"
                onClick={() => navigateToService('hairTransplant')}
              >
                {t('services.viewDetails')}
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">{t('services.rhinoplasty.icon')}</div>
              <h3>{t('services.rhinoplasty.title')}</h3>
              <button 
                className="btn btn-outline"
                onClick={() => navigateToService('rhinoplasty')}
              >
                {t('services.viewDetails')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('testimonials.testimonial1.text', 'Curevoy sayesinde Türkiye\'de mükemmel bir diş tedavisi aldım. Tüm süreç çok profesyoneldi ve sonuçtan çok memnunum.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('testimonials.testimonial1.author', 'Sarah Johnson')}</strong>
                <span>{t('testimonials.testimonial1.location', 'İngiltere - Diş Tedavisi')}</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('testimonials.testimonial2.text', 'Saç ektirme operasyonum çok başarılı geçti. Doktorum ve ekibi çok ilgiliydi. Kesinlikle tavsiye ederim.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('testimonials.testimonial2.author', 'Ahmed Al-Rashid')}</strong>
                <span>{t('testimonials.testimonial2.location', 'Suudi Arabistan - Saç Ektirme')}</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>{t('testimonials.testimonial3.text', 'Kardiyoloji tedavim için Türkiye\'yi seçtim ve hiç pişman değilim. Modern hastane ve uzman doktorlar.')}</p>
              </div>
              <div className="testimonial-author">
                <strong>{t('testimonials.testimonial3.author', 'Maria Rodriguez')}</strong>
                <span>{t('testimonials.testimonial3.location', 'İspanya - Kardiyoloji')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>{t('contact.info.phone')}</h3>
                  <p>{t('contact.info.phoneNumber')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>{t('contact.info.email')}</h3>
                  <p>{t('contact.info.emailAddress')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>{t('contact.info.address')}</h3>
                  <p>{t('contact.info.addressText')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-details">
                  <h3>{t('contact.info.workingHours')}</h3>
                  <p>{t('contact.info.workingHoursText')}</p>
                </div>
              </div>
            </div>
            <div className="whatsapp-section">
              <div className="whatsapp-card">
                <h3>{t('contact.whatsapp.title')}</h3>
                <p>{t('contact.whatsapp.description')}</p>
                <a 
                  href="https://wa.me/905516362773" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  {t('contact.whatsapp.button')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  // Hizmetler Sayfası İçeriği
  const ServicesPage = () => (
    <section className="services-page">
      <div className="container">
        <div className="services-header">
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentPage('home')}
            style={{ marginBottom: '2rem' }}
          >
            ← Ana Sayfaya Dön
          </button>
          <h1 className="section-title">Hizmetlerimiz</h1>
          <p className="section-subtitle">Türkiye'nin en iyi doktorları ile sağlığınız için buradayız</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">❤️</div>
            <h3>Kardiyoloji</h3>
            <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
              <li>Kalp damar hastalıkları</li>
              <li>Koroner anjiyografi</li>
              <li>Kalp pili takılması</li>
              <li>Kalp ameliyatları</li>
            </ul>
            <button 
              className="btn btn-primary"
              onClick={() => navigateToService('cardiology')}
            >
              Detayları Görüntüle
            </button>
          </div>
          
          <div className="service-card">
            <div className="service-icon">🦷</div>
            <h3>Diş Tedavisi</h3>
            <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
              <li>İmplant tedavisi</li>
              <li>Zirkonyum kaplama</li>
              <li>Ortodonti tedavisi</li>
              <li>Diş beyazlatma</li>
            </ul>
            <button 
              className="btn btn-primary"
              onClick={() => navigateToService('dental')}
            >
              Detayları Görüntüle
            </button>
          </div>
          
          <div className="service-card">
            <div className="service-icon">💇‍♂️</div>
            <h3>Saç Ektirme</h3>
            <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
              <li>FUE saç ektirme</li>
              <li>DHI saç ektirme</li>
              <li>Sakal ektirme</li>
              <li>Kaş ektirme</li>
            </ul>
            <button 
              className="btn btn-primary"
              onClick={() => navigateToService('hairTransplant')}
            >
              Detayları Görüntüle
            </button>
          </div>
          
          <div className="service-card">
            <div className="service-icon">👃</div>
            <h3>Burun Estetiği</h3>
            <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
              <li>Rinoplasti ameliyatı</li>
              <li>Burun ucu estetiği</li>
              <li>Septoplasti</li>
              <li>Burun kırığı düzeltme</li>
            </ul>
            <button 
              className="btn btn-primary"
              onClick={() => navigateToService('rhinoplasty')}
            >
              Detayları Görüntüle
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="App">
      <Header />
      
      {showAppointmentForm && (
        <AppointmentForm 
          onClose={closeAppointmentForm}
          onSubmit={handleAppointmentSubmit}
        />
      )}
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'cardiology' && <CardiologyPage />}
      {currentPage === 'dental' && <DentalPage />}
      {currentPage === 'hairTransplant' && <HairTransplantPage />}
      {currentPage === 'rhinoplasty' && <RhinoplastyPage />}
      
      <Footer />
    </div>
  );
}

export default App;
