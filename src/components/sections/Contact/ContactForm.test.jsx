// src/components/sections/Contact/ContactForm.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ContactForm from './ContactForm';
import { sendEmail } from '@/services/emailService';

// Mock für sendEmail
vi.mock('@/services/emailService', () => ({
  sendEmail: vi.fn()
}));

// Mock für framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>
  }
}));

// Mock für Typography Komponenten
vi.mock('@/components/common/Typography', () => ({
  H3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  H4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  BodyText: ({ children, ...props }) => <p {...props}>{children}</p>
}));

// Mock für Button Komponente
vi.mock('@/components/ui/Button', () => ({
  default: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

// i18n Setup
i18n.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'de',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    de: {
      common: {
        contactForm: {
          fields: {
            name: {
              label: 'Name',
              placeholder: 'Ihr Name',
              error: 'Name ist erforderlich'
            },
            email: {
              label: 'E-Mail',
              placeholder: 'ihre@email.de',
              error: 'E-Mail ist erforderlich',
              invalid: 'Ungültige E-Mail-Adresse'
            },
            message: {
              label: 'Nachricht',
              placeholder: 'Ihre Nachricht...',
              error: 'Nachricht ist erforderlich'
            }
          },
          submit: {
            button: 'Nachricht senden',
            sending: 'Wird gesendet...'
          },
          success: {
            title: 'Nachricht erfolgreich gesendet!',
            message: 'Wir werden uns schnellstmöglich bei Ihnen melden.'
          }
        }
      }
    }
  }
});

describe('ContactForm', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <ContactForm />
      </I18nextProvider>
    );
    vi.clearAllMocks();
  });

  it('renders form fields', () => {
    expect(screen.getByPlaceholderText('Ihr Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ihre@email.de')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ihre Nachricht...')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const submitButton = screen.getByRole('button', { 
      name: /nachricht senden/i 
    });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errors = screen.getAllByText((content, element) => {
        const hasErrorMessage = content.includes('ist erforderlich');
        const isErrorElement = element.tagName.toLowerCase() === 'p';
        return hasErrorMessage && isErrorElement;
      });
      
      expect(errors).toHaveLength(3); // Name, Email, und Nachricht Fehler
    });
  });

  it('submits form successfully', async () => {
    // Email-Service Mock
    sendEmail.mockResolvedValueOnce(true);

    // Formular ausfüllen
    fireEvent.change(screen.getByPlaceholderText('Ihr Name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('ihre@email.de'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Ihre Nachricht...'), {
      target: { value: 'Test Nachricht' }
    });

    // Formular absenden
    const submitButton = screen.getByRole('button', { 
      name: /nachricht senden/i 
    });
    fireEvent.click(submitButton);

    // Auf Erfolgsmeldung warten
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return content.includes('Nachricht erfolgreich gesendet!') &&
               element.tagName.toLowerCase() === 'h3';
      })).toBeInTheDocument();
    });

    // Überprüfen ob sendEmail aufgerufen wurde
    expect(sendEmail).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test Nachricht',
      phone: '',
      company: '',
      package: ''
    }, 'contact');
  });
});