// src/utils/analytics.js
export const trackEvent = (category, action, label = null, value = null) => {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
  
  if (cookiesAccepted && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Beispiel für die Verwendung in ContactForm.jsx:
import { trackEvent } from '@/utils/analytics';

// Im handleSubmit:
trackEvent('Contact', 'form_submit', 'contact_form');