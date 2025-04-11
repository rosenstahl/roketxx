import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Scale, Briefcase, ShieldAlert, Gavel, ClipboardList, UserCheck, Mail } from 'lucide-react';
import { H1, H2, BodyText } from '@/components/common/Typography';
import { GlassEffect } from '@/components/ui/GlassEffect';

// Icon-Mapping für die verschiedenen Abschnitte
const sectionIcons = {
  0: { icon: UserCheck, color: "#FF7043" },
  1: { icon: Briefcase, color: "#007AFF" },
  2: { icon: Scale, color: "#00B27A" },
  3: { icon: FileText, color: "#FF7043" },
  4: { icon: ClipboardList, color: "#007AFF" },
  5: { icon: Scale, color: "#00B27A" },
  6: { icon: Gavel, color: "#FF7043" },
  7: { icon: ShieldAlert, color: "#007AFF" },
  8: { icon: Mail, color: "#00B27A" },
  9: { icon: FileText, color: "#FF7043" }
};

const Section = ({ data, index }) => {
  const { icon: IconComponent, color } = sectionIcons[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassEffect className="p-4 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <IconComponent size={20} style={{ color: color }} />
          </motion.div>

          <div className="flex-1">
            <H2 className="text-white mb-3 text-lg">
              {data.title}
            </H2>
            <div className="space-y-1">
              {data.content.map((line, i) => (
                <BodyText
                  key={i}
                  className="text-white/80 text-sm"
                >
                  {line}
                </BodyText>
              ))}
            </div>
          </div>
        </div>
      </GlassEffect>
    </motion.div>
  );
};

const AGB = () => {
  const { t } = useTranslation('common');
  const sections = t('terms.sections', { returnObjects: true });

  return (
    <div className="min-h-screen pt-16 bg-[#171614]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-12"
        >
          <H1 className="text-white mb-4 text-2xl">
            {t('terms.title')}
          </H1>
          <BodyText className="text-white/80 text-sm">
            {t('terms.subtitle')}
          </BodyText>
        </motion.div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Section
              key={section.title}
              data={section}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AGB;