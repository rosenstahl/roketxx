export const navigationItems = [
  {
    id: 'home',
    label: {
      de: 'Startseite',
      en: 'Home',
      tr: 'Ana Sayfa'
    },
    icon: 'home.svg',
    type: 'link',
    to: '/',
    action: 'scroll-top'
  },
  {
    id: 'packages',
    label: {
      de: 'Leistungen',
      en: 'Services',
      tr: 'Hizmetler'
    },
    icon: 'package.svg',
    type: 'button',
    action: 'scroll-to-packages'
  },
  {
    id: 'contact',
    label: {
      de: 'Kontakt',
      en: 'Contact',
      tr: 'İletişim'
    },
    icon: 'contact.svg',
    type: 'link',
    to: '/kontakt'
  },
  {
    id: 'language',
    label: {
      de: 'Deutsch',
      en: 'English',
      tr: 'Türkçe'
    },
    icon: 'language.svg',
    type: 'button',
    action: 'cycle-language'
  }
];