// src/services/emailService.js
export const sendEmail = async (formData, formType = 'landing') => {
  try {
    // Betreff basierend auf Formulartyp und Paket
    const subject = formType === 'landing'
      ? `Neue Paket-Anfrage: ${formData.package || 'Kein Paket ausgewählt'}`
      : 'Neue Kontaktanfrage';
 
    // Hauptversand an primäre Email
    const response = await fetch('https://formsubmit.co/ajax/info@roketx.de', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        _subject: subject,
        _template: 'table',
        _captcha: false,
        _replyto: formData.email, // Ermöglicht direktes Antworten
        timestamp: new Date().toISOString() // Zeitstempel für besseres Tracking
      })
    });
 
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email error response:', errorText);
      throw new Error(`Email konnte nicht gesendet werden: ${errorText}`);
    }
 
    // Backup an zweite Email-Adresse (optional)
    try {
      await fetch('https://formsubmit.co/ajax/hasanyilmaz1811@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `BACKUP: ${subject}`,
          _template: 'table',
          _captcha: false,
          timestamp: new Date().toISOString()
        })
      });
    } catch (backupError) {
      // Backup-Fehler loggen aber nicht werfen
      console.warn('Backup email failed:', backupError);
    }
 
    // Erfolg loggen und bestätigen
    const result = await response.json();
    console.info('Email sent successfully:', {
      type: formType,
      subject,
      timestamp: new Date().toISOString()
    });
 
    return true;
 
  } catch (error) {
    // Error tracking mit mehr Kontext
    console.error('Email sending failed:', {
      error,
      formType,
      timestamp: new Date().toISOString()
    });
    
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: {
          formType,
          subject: formType === 'landing' ? 'Paket-Anfrage' : 'Kontaktanfrage',
          timestamp: new Date().toISOString()
        }
      });
    }
 
    throw error;
  }
 };