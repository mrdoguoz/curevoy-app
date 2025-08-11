import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  };

  const changeLanguage = (lng: string) => {
    console.log('Dil değiştiriliyor:', lng);
    i18n.changeLanguage(lng).then(() => {
      console.log('Dil değiştirildi:', i18n.language);
    }).catch((err: any) => {
      console.error('Dil değiştirme hatası:', err);
    });
  };

  const languages = [
    { code: 'tr', name: t('languages.tr') },
    { code: 'en', name: t('languages.en') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'ru', name: t('languages.ru') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'de', name: t('languages.de') },
    { code: 'es', name: t('languages.es') }
  ];

  console.log('Mevcut dil:', i18n.language);
  console.log('Mevcut dil kaynakları:', i18n.store.data);

  return (
    <header className="header" role="banner">
      <div className="header-container">
        {/* Logo ve Başlık */}
        <div className="logo-section">
          <a href="/" className="logo" aria-label={`${t('header.logo')} ${t('navigation.home')}`}>
            <span className="logo-icon" role="img" aria-label="Sağlık simgesi">🏥</span>
            <div className="logo-text">
              <h1 className="logo-title">{t('header.logo')}</h1>
              <p className="logo-slogan">{t('header.slogan')}</p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" role="navigation" aria-label={t('header.languageSelector')}>
          <ul className="nav-menu">
            <li><a href="/" className="nav-link" aria-current="page">{t('navigation.home')}</a></li>
            <li><a href="#faq" className="nav-link">{t('navigation.faq')}</a></li>
          </ul>
        </nav>

        {/* Dil Seçimi ve CTA */}
        <div className="header-actions">
          {/* Dil Seçimi */}
          <div className="language-selector">
            <label htmlFor="language-select" className="sr-only">{t('header.languageSelector')}</label>
            <select 
              id="language-select"
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="language-select"
              aria-label={t('header.languageSelector')}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>



          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t('header.mobileMenu')}
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}
        id="mobile-menu"
        role="navigation"
        aria-label={t('header.mobileMenu')}
        aria-hidden={!isMenuOpen}
      >
        <ul className="mobile-menu">
          <li><a href="/" className="mobile-link" aria-current="page">{t('navigation.home')}</a></li>
          <li><a href="#faq" className="mobile-link">{t('navigation.faq')}</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 