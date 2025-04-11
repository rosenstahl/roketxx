import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, FileText, MessageCircle } from 'lucide-react';
import { H1, H2, BodyText } from '@/components/common/Typography';

// Importiere die verbesserten Komponenten
import { CalendlyLoader, FormLoader } from './components/LoadingStates';
import StatusIndicator from './components/StatusIndicator';

// Import Contact-Optionen
import ContactForm from './ContactForm';
import WhatsAppContact from './WhatsAppContact';
import CalendlyEmbed from './CalendlyEmbed';
import ContactFAQs from './ContactFAQs';

const getContactOptions = (t) => [
  {
    id: 'meeting',
    icon: Calendar,
    title: t('contactpage.page.options.meeting.title'),
    description: t('contactpage.page.options.meeting.description'),
    component: (
      <Suspense fallback={<CalendlyLoader />}>
        <CalendlyEmbed />
      </Suspense>
    ),
    color: '#FF7043'
  },
  {
    id: 'project',
    icon: FileText,
    title: t('contactpage.page.options.project.title'),
    description: t('contactpage.page.options.project.description'),
    component: (
      <Suspense fallback={<FormLoader />}>
        <ContactForm />
      </Suspense>
    ),
    color: '#007AFF'
  },
  {
    id: 'quick',
    icon: MessageCircle,
    title: t('contactpage.page.options.quick.title'),
    description: t('contactpage.page.options.quick.description'),
    component: <WhatsAppContact />,
    color: '#00B27A'
  }
];

const ContactCard = ({ option, isSelected, onSelect }) => {
  const { icon: Icon, title, description, color } = option;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full min-h-[160px] p-5 rounded-2xl border text-left 
        transition-all duration-300 group overflow-hidden
        ${isSelected 
          ? 'bg-white border-2' 
          : 'bg-white/5 border border-white/10 hover:border-white/20'
        }
      `}
      style={{
        borderColor: isSelected ? color : undefined
      }}
    >
      <div className="flex items-start gap-3">
        <div 
          className={`
            p-2.5 rounded-xl transition-colors duration-300
            ${isSelected 
              ? 'bg-[#FAFAFA]' 
              : 'bg-main-primary/5 group-hover:bg-main-primary/10'
            }
          `}
          style={{ color: isSelected ? color : '#1F1E1C' }}
        >
          <Icon size={20} />
        </div>
        
        <div>
          <h3 className={`
            text-lg font-semibold mb-1.5 transition-colors duration-300
            ${isSelected ? 'text-main-secondary' : 'text-main-secondary'}
          `}>
            {title}
          </h3>
          
          <BodyText className={`
            text-sm leading-relaxed transition-colors duration-300
            ${isSelected ? 'text-main-tertiary/90' : 'text-main-tertiary/70'}
          `}>
            {description}
          </BodyText>
        </div>
      </div>
    </motion.button>
  );
};

export default function ContactPage() {
  const { t } = useTranslation('common');
  const [selectedOption, setSelectedOption] = useState(null);
  const contactOptions = getContactOptions(t);

  return (
    <main className="relative min-h-screen bg-base-primary py-16 md:py-24">
      {/* Background Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-70" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] 
                     bg-gradient-radial from-white/5 via-transparent to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <H1 className="text-main-secondary mb-6">
            {t('contactpage.page.title')}
          </H1>
          <StatusIndicator />
        </motion.div>

        {/* Options Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ContactCard
                  option={option}
                  isSelected={selectedOption === option.id}
                  onSelect={() => setSelectedOption(option.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Option Content */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {contactOptions.find(opt => opt.id === selectedOption)?.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 max-w-2xl mx-auto"
        >
          <H2 className="text-main-secondary text-center mb-8">
            {t('contactpage.page.faq_title')}
          </H2>
          <ContactFAQs />
        </motion.div>
      </div>
    </main>
  );
}