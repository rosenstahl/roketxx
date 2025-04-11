// src/components/sections/Navigation/Navigation.test.jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Navigation from './Navigation';

// Test-i18n Setup
i18n.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'de',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    de: {
      common: {
        navigation: {
          home: 'Startseite',
          services: 'Leistungen',
          contact: 'Kontakt'
        }
      }
    }
  }
});

// Mock für assetHelpers
vi.mock('@/utils/assetHelpers', () => ({
  getNavigationIcon: (name) => `/mock-path/${name}`
}));

const renderNavigation = () => {
  render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Navigation />
      </I18nextProvider>
    </BrowserRouter>
  );
};


describe('Navigation Component', () => {
  beforeEach(() => {
    renderNavigation();
  });

  it('renders navigation items', () => {
    // Teste Navigation Links anhand der übersetzten Alt-Texte
    expect(screen.getByAltText('Startseite')).toBeInTheDocument();
    expect(screen.getByAltText('Leistungen')).toBeInTheDocument();
    expect(screen.getByAltText('Kontakt')).toBeInTheDocument();
  });

  it('renders language selector', () => {
    const languageButton = screen.getByRole('button', { name: /deutsch/i });
    expect(languageButton).toBeInTheDocument();
  });
});
