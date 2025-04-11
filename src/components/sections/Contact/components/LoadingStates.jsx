import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, FileText } from 'lucide-react';

const LoadingState = ({ Icon, text }) => (
  <div className="p-12 flex flex-col items-center justify-center text-center">
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="mb-4"
    >
      <Icon size={32} className="text-accent-primary/50" />
    </motion.div>
    <p className="text-main-tertiary/70">{text}</p>
  </div>
);

export const CalendlyLoader = () => {
  const { t } = useTranslation('common');
  return (
    <LoadingState 
      Icon={Calendar} 
      text={t('contactpage.loading.calendly')} 
    />
  );
};

export const FormLoader = () => {
  const { t } = useTranslation('common');
  return (
    <LoadingState 
      Icon={FileText} 
      text={t('contactpage.loading.form')} 
    />
  );
};

export default {
  CalendlyLoader,
  FormLoader
};