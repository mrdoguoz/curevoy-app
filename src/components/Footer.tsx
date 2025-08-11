import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Güven Sertifikaları */}
        <div className="trust-section">
          <h3 className="trust-title">{t('footer.trust.title')}</h3>
          <div className="certificates">
            <div className="certificate">
              <span className="cert-icon">🔒</span>
              <span>{t('footer.trust.ssl')}</span>
            </div>
            <div className="certificate">
              <span className="cert-icon">🏆</span>
              <span>{t('footer.trust.jci')}</span>
            </div>
            <div className="certificate">
              <span className="cert-icon">📋</span>
              <span>{t('footer.trust.kvkk')}</span>
            </div>
            <div className="certificate">
              <span className="cert-icon">🌍</span>
              <span>{t('footer.trust.iso')}</span>
            </div>
          </div>
        </div>

        {/* Ana Footer İçeriği */}
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('footer.sections.about.title')}</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">📘</a>
              <a href="#" aria-label="Twitter" className="social-link">🐦</a>
              <a href="#" aria-label="Instagram" className="social-link">📷</a>
              <a href="#" aria-label="LinkedIn" className="social-link">💼</a>
            </div>
          </div>



          <div className="footer-section">
            <h4>{t('footer.sections.support.title')}</h4>
            <ul>
              <li><a href="/faq">{t('footer.sections.support.faq')}</a></li>
              <li><a href="/privacy">{t('footer.sections.support.privacy')}</a></li>
              <li><a href="/terms">{t('footer.sections.support.terms')}</a></li>
              <li><a href="/support">{t('footer.sections.support.customerSupport')}</a></li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgiler */}
        <div className="footer-bottom">
          <div className="footer-info">
            <p>{t('footer.bottom.copyright')}</p>
            <p>{t('footer.bottom.approval')}</p>
          </div>
          <div className="footer-links">
            <a href="/privacy">{t('footer.bottom.links.privacy')}</a>
            <span className="separator">•</span>
            <a href="/terms">{t('footer.bottom.links.terms')}</a>
            <span className="separator">•</span>
            <a href="/cookies">{t('footer.bottom.links.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 