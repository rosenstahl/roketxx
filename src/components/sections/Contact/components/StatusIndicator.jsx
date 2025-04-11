import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const calculateBusinessHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sonntag, 1-5 = Montag-Freitag
  const hour = now.getHours();

  // Sonntag oder Samstag
  if (day === 0 || day === 6) return false;

  // Montag-Freitag
  if (day >= 1 && day <= 5) {
    // Zwischen 9 und 17 Uhr
    return hour >= 9 && hour < 17;
  }

  return false;
};

const StatusIndicator = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(calculateBusinessHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen(calculateBusinessHours());
    }, 60000); // Jede Minute aktualisieren

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex gap-6 items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
      <div className="flex items-center gap-2">
        <motion.div
          animate={isOpen ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          } : {
            scale: 1,
            opacity: 0.5
          }}
          transition={isOpen ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
          className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-[#4CAF50]' : 'bg-gray-400'}`}
        />
        <span className="text-sm text-main-tertiary font-medium">
          {isOpen 
            ? t('contactpage.status.online')
            : t('contactpage.status.offline')}
        </span>
      </div>

      <div className="w-px h-4 bg-white/10" />

      <div className="flex items-center gap-2">
        {isOpen ? (
          <div className="text-sm text-main-tertiary">
            <span className="font-medium">
              {t('contactpage.status.response_time')}: ~15 {t('contactpage.status.minutes')}
            </span>
          </div>
        ) : (
          <div className="text-sm text-main-tertiary">
            <div>
              <span className="font-medium">{t('contactpage.status.business_hours')}</span>
            </div>
            <div className="text-xs opacity-80">
              {t('contactpage.status.back_text')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;