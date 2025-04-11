import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { H2, H3, H4, BodyText, LeadText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { getPartnerLogo } from '@/utils/assetHelpers';

const partners = [
  { 
    name: "Google Cloud", 
    logo: getPartnerLogo("google-cloud.svg")
  },
  { 
    name: "AWS Advanced Consulting", 
    logo: getPartnerLogo("aws.svg")
  },
  { 
    name: "Shopify Plus", 
    logo: getPartnerLogo("shopify.svg")
  },
  { 
    name: "Meta Business", 
    logo: getPartnerLogo("meta.svg")
  }
];

const timelineEvents = ["2019", "2021", "2024"];

export const About = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const achievements = [
    {
      number: t('about.achievements.projects.number'),
      text: t('about.achievements.projects.text')
    },
    {
      number: t('about.achievements.satisfaction.number'),
      text: t('about.achievements.satisfaction.text')
    },
    {
      number: t('about.achievements.experience.number'),
      text: t('about.achievements.experience.text')
    }
  ];

  return (
    <section className="w-full bg-base-primary py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <H2 className="text-main-secondary mb-4">
            {t('about.title')}
          </H2>
        </motion.div>

        {/* Timeline & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <H3 className="text-main-secondary mb-4">
                {t('about.history.title')}
              </H3>
              <BodyText className="text-main-tertiary">
                {t('about.history.part1')}
              </BodyText>
            </div>
            <BodyText className="text-main-tertiary">
              {t('about.history.part2')}
            </BodyText>
            <BodyText className="text-main-tertiary">
              {t('about.history.part3')}
            </BodyText>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-accent-primary/20" />
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((year) => (
                <div key={year} className="relative pl-16">
                  <div className="absolute left-0 w-11 h-11 rounded-full bg-accent-primary/10 border-2 border-accent-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent-primary" />
                  </div>
                  <div>
                    <span className="font-bold text-accent-primary">{year}</span>
                    <H4 className="text-main-secondary mt-1 mb-2">
                      {t(`about.timeline.${year}.title`)}
                    </H4>
                    <BodyText className="text-main-tertiary">
                      {t(`about.timeline.${year}.description`)}
                    </BodyText>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <span className="block text-4xl font-bold text-accent-primary mb-2">
                {achievement.number}
              </span>
              <BodyText className="text-main-tertiary">
                {achievement.text}
              </BodyText>
            </motion.div>
          ))}
        </div>

        {/* Partners & Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <H3 className="text-main-secondary mb-6">
              {t('about.partnerships.title')}
            </H3>
            <div className="grid grid-cols-2 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img src={partner.logo} alt={partner.name} className="w-6 h-6" />
                  <BodyText className="text-main-tertiary">{partner.name}</BodyText>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <H3 className="text-main-secondary mb-6">
              {t('about.awards.title')}
            </H3>
            <div className="grid grid-cols-2 gap-6">
              {t('about.awards.list', { returnObjects: true }).map((award, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <BodyText className="text-main-tertiary">{award}</BodyText>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <LeadText className="text-main-secondary mb-8 max-w-2xl mx-auto">
            {t('about.quote')}
          </LeadText>
          
          <Button
            onClick={() => navigate('/kontakt')}
            variant="primary"
            size="large"
          >
            {t('about.cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;