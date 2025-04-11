import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { H3, BodyText } from '@/components/common/Typography';
import { motion } from 'framer-motion';
import { Globe, Clock, ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CalendlyEmbed({ onBack }) {
  const { t, i18n } = useTranslation('common');
  const [timezone, setTimezone] = useState('');
  const [loading, setLoading] = useState(true);

  // Zeitzonen-Erkennung
  useEffect(() => {
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formatter = new Intl.DateTimeFormat(i18n.language, {
        timeZoneName: 'long',
        timeZone: detectedTimezone
      });
      const formattedZone = formatter.formatToParts()
        .find(part => part.type === 'timeZoneName')?.value || detectedTimezone;
      
      setTimezone(formattedZone);
    } catch (error) {
      console.error('Timezone detection error:', error);
      setTimezone('Europe/Berlin');
    }
  }, [i18n.language]);

  // Calendly laden
  useEffect(() => {
    if (typeof window !== 'undefined' && timezone) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setLoading(false);
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/hasanyilmaz1811/roketx',
          parentElement: document.getElementById('calendlyEmbed'),
          prefill: {
            email: '',
            firstName: '',
            lastName: '',
            customAnswers: {
              a1: timezone
            }
          },
          utm: {
            utmSource: 'website',
            utmMedium: 'contact_page',
            utmCampaign: 'consultation'
          }
        });
      };

      return () => {
        // Entferne das Script
        const calendlyScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        if (calendlyScript) {
          document.body.removeChild(calendlyScript);
        }
        
        // Entferne das Calendly Widget
        const calendlyEmbed = document.getElementById('calendlyEmbed');
        if (calendlyEmbed) {
          calendlyEmbed.innerHTML = '';
        }
      };
    }
  }, [timezone]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <H3 className="text-main-secondary mb-3">
          {t('calendly.header.title')}
        </H3>
        <BodyText className="text-main-tertiary mb-6">
          {t('calendly.header.subtitle')}
        </BodyText>
        
        {/* Timezone Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-main-tertiary/5 rounded-full text-sm text-main-tertiary"
        >
          <Globe size={14} className="text-accent-primary" />
          <span>
            {t('calendly.timezone.label')}: {timezone || t('calendly.timezone.detecting')}
          </span>
        </motion.div>
      </div>

      {/* Loading State */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full"
          />
          <BodyText className="text-main-tertiary animate-pulse">
            {t('calendly.loading.text')}
          </BodyText>
        </motion.div>
      )}

      {/* Calendly Embed */}
      <div 
        id="calendlyEmbed"
        className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ height: '100vh', width: '100%' }}
      />

      {/* Time Slots Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-main-tertiary/5 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-main-secondary mb-1">
              {t('calendly.timeSlots.title')}
            </p>
            <p className="text-sm text-main-tertiary">
              {t('calendly.timeSlots.hours')}
              {timezone && timezone !== 'Europe/Berlin' && ` ${t('calendly.timeSlots.localTime')}`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}