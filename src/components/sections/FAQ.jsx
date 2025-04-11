import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { H2, LeadText, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { GlassEffect } from '@/components/ui/GlassEffect';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className="overflow-hidden"
    >
      <GlassEffect className="mb-4 overflow-hidden transition-all duration-300">
        <button
          onClick={onClick}
          className="w-full px-6 py-6 flex justify-between items-center text-left"
          aria-expanded={isOpen}
        >
          <BodyText className="font-semibold pr-8">
            {question}
          </BodyText>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-6 h-6 text-accent-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v12M6 12h12" 
              />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <BodyText className="px-6 pb-6">
                {answer}
              </BodyText>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassEffect>
    </motion.div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const FAQ = () => {
  const [openId, setOpenId] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');

  const handleContactClick = () => {
    navigate('/kontakt');
  };

  const faqItems = t('faq.items', { returnObjects: true });

  // Schema.org Daten für Suchmaschinen
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "inLanguage": i18n.language,
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Entferne altes Schema wenn vorhanden
    const existingSchema = document.querySelector('#faq-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Füge neues Schema hinzu
    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Cleanup beim Unmount
    return () => {
      const script = document.querySelector('#faq-schema');
      if (script) {
        script.remove();
      }
    };
  }, [faqItems, i18n.language]);

  return (
    <section 
      className="relative py-24 bg-base-primary overflow-hidden"
      aria-labelledby="faq-title"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-tertiary opacity-40" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <H2 id="faq-title" className="mb-4">
            {t('faq.title')}
          </H2>
          <LeadText>
            {t('faq.subtitle')}
          </LeadText>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            role="list"
            aria-label={t('faq.title')}
          >
            {faqItems.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === index}
                onClick={() => setOpenId(openId === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <LeadText className="mb-6">
            {t('faq.noAnswer')}
          </LeadText>
          <Button
            onClick={handleContactClick}
            variant="primary"
            size="large"
            aria-label={t('faq.contact')}
          >
            {t('faq.contact')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;