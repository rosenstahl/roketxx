import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, MessageCircle, Calendar, FileText } from 'lucide-react';
import { H3, BodyText } from '@/components/common/Typography';

const groupIcons = {
  general: { icon: MessageCircle },
  meetings: { icon: Calendar },
  project: { icon: FileText }
};

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <motion.div
    initial={false}
    animate={{ 
      backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      transition: { duration: 0.2 }
    }}
    className="rounded-xl overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex justify-between items-center text-left"
    >
      <span className={`
        font-medium transition-colors duration-200
        ${isOpen ? 'text-accent-primary' : 'text-main-secondary'}
      `}>
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`
          flex-shrink-0 w-5 h-5
          ${isOpen ? 'text-accent-primary' : 'text-main-tertiary'}
        `}
      >
        <ChevronDown />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-6 pb-4">
            <BodyText className="text-main-tertiary">
              {answer}
            </BodyText>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function ContactFAQs() {
  const [openItems, setOpenItems] = useState({});
  const { t } = useTranslation('common');

  const toggleItem = (groupId, index) => {
    setOpenItems(prev => {
      const key = `${groupId}-${index}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const faqGroups = t('contactFaqs.groups', { returnObjects: true });

  return (
    <div className="space-y-8">
      {Object.entries(faqGroups).map(([groupId, group]) => (
        <motion.div
          key={groupId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          {/* Group Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              {React.createElement(groupIcons[groupId].icon, { 
                size: 20,
                className: "text-accent-primary"
              })}
            </div>
            <H3 className="text-main-secondary">
              {group.title}
            </H3>
          </div>

          {/* FAQ Items */}
          <div className="space-y-2">
            {group.items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.q}
                answer={item.a}
                isOpen={openItems[`${groupId}-${index}`]}
                onToggle={() => toggleItem(groupId, index)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}