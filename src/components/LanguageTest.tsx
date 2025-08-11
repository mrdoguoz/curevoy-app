import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageTest: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log('Dil değiştiriliyor:', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px' }}>
      <h3>Dil Test Bileşeni</h3>
      <p>Mevcut Dil: {i18n.language}</p>
      <p>Test Metni: {t('navigation.home')}</p>
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => changeLanguage('tr')} style={{ margin: '5px' }}>Türkçe</button>
        <button onClick={() => changeLanguage('en')} style={{ margin: '5px' }}>English</button>
        <button onClick={() => changeLanguage('ar')} style={{ margin: '5px' }}>العربية</button>
        <button onClick={() => changeLanguage('ru')} style={{ margin: '5px' }}>Русский</button>
        <button onClick={() => changeLanguage('fr')} style={{ margin: '5px' }}>Français</button>
        <button onClick={() => changeLanguage('de')} style={{ margin: '5px' }}>Deutsch</button>
        <button onClick={() => changeLanguage('es')} style={{ margin: '5px' }}>Español</button>
      </div>
    </div>
  );
};

export default LanguageTest; 