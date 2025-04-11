import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNavigationIcon } from '@/utils/assetHelpers';
import { useNavigation } from './useNavigation';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');
  
  useNavigation();
  
  const cycleLanguage = () => {
    const languages = ['de', 'en', 'tr'];
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('preferredLanguage', nextLanguage);
  };

  const languageNames = {
    de: 'Deutsch',
    en: 'English',
    tr: 'Türkçe'
  };
    
  const scrollToPackages = () => {
    const packagesSection = document.querySelector('.package-comparison');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/?scrollTo=packages');
    }
  };

  return (
    <div className="nav-wrap">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-item__link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              <img src={getNavigationIcon('home.svg')} alt={t('navigation.home')} className="image" />
              <div className="nav-item__tooltip">
                <div>{t('navigation.home')}</div>
              </div>
            </Link>
          </li>
          
          <li className="nav-item">
            <button 
              onClick={scrollToPackages} 
              className="nav-item__link"
              type="button"
            >
              <img src={getNavigationIcon('package.svg')} alt={t('navigation.services')} className="image" />
              <div className="nav-item__tooltip">
                <div>{t('navigation.services')}</div>
              </div>
            </button>
          </li>
                    
          <li className="nav-item">
            <Link to="/kontakt" className="nav-item__link">
              <img src={getNavigationIcon('contact.svg')} alt={t('navigation.contact')} className="image" />
              <div className="nav-item__tooltip">
                <div>{t('navigation.contact')}</div>
              </div>
            </Link>
          </li>
          
          <li className="nav-item">
            <button 
              onClick={cycleLanguage} 
              className="nav-item__link"
              type="button"
            >
              <img src={getNavigationIcon('language.svg')} alt="Language Selector" className="image" />
              <div className="nav-item__tooltip">
                <div>{languageNames[i18n.language]}</div>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;