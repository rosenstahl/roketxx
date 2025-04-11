import React from 'react';
import { motion } from 'framer-motion'; // behalten für Icon-Animationen
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Server, Shield, Clock, PlusCircle } from 'lucide-react';
import { H2, H3, LeadText, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';

const featureConfig = [
  {
    id: 'setup',
    Icon: Server,
    color: '#FF7043'  // startup color
  },
  {
    id: 'premium',
    Icon: Clock,
    color: '#007AFF'  // digital color
  },
  {
    id: 'guarantee',
    Icon: Shield,
    color: '#00B27A'  // makeover color
  },
  {
    id: 'optional',
    Icon: PlusCircle,
    color: '#9C27B0'  // growth color
  }
];

const FeatureCard = ({ featureId, config, index }) => {
  const { t } = useTranslation('common');
  const IconComponent = config.Icon;
  const feature = {
    title: t(`support.features.${featureId}.title`),
    items: t(`support.features.${featureId}.items`, { returnObjects: true })
  };
  
  return (
    <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div
        className="mb-6 relative w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${config.color}20` }}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <IconComponent size={20} style={{ color: config.color }} />
        </motion.div>
      </div>

      <H3 className="text-main-secondary text-lg mb-4">
        {feature.title}
      </H3>

      <ul className="space-y-2.5">
        {feature.items.map((item, itemIndex) => (
          <li
            key={itemIndex}
            className="flex items-start gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="p-0.5 rounded-full mt-1"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <svg 
                className="w-3 h-3" 
                style={{ color: config.color }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <BodyText className="text-main-tertiary text-sm">
              {item}
            </BodyText>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <section className="w-full bg-base-primary py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <H2 className="text-main-secondary mb-4">
            {t('support.header.title')}
          </H2>
          <LeadText className="max-w-2xl mx-auto">
            {t('support.header.subtitle')}
          </LeadText>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureConfig.map((config, index) => (
            <FeatureCard
              key={config.id}
              featureId={config.id}
              config={config}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <BodyText className="text-main-tertiary mb-6">
            {t('support.cta.question')}
          </BodyText>
          <Button
            onClick={() => navigate('/kontakt')}
            variant="primary"
            size="large"
          >
            {t('support.cta.button')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Support;