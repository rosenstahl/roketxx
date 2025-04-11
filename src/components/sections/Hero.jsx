import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { H1, LeadText, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { getTrustedByLogo } from '@/utils/assetHelpers';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import OptimizedVideo from '@/components/common/OptimizedVideo';


const partners = [
  { id: 1, name: 'Altinzade', logo: getTrustedByLogo('Altinzade.svg') },
  { id: 2, name: 'VITA', logo: getTrustedByLogo('vita.svg') },
  { id: 3, name: 'TREU Service GmbH', logo: getTrustedByLogo('treu.svg') },
  { id: 4, name: 'Zoho', logo: getTrustedByLogo('Zoho.svg') },
  { id: 5, name: 'Volksbank', logo: getTrustedByLogo('volksbank.svg') },
  { id: 6, name: 'Housecare24', logo: getTrustedByLogo('housecare24.svg') },
  { id: 7, name: 'Google Cloud', logo: getTrustedByLogo('google.svg') },
  { id: 8, name: 'AWS Advanced Consulting', logo: getTrustedByLogo('aws.svg') },
  { id: 9, name: 'Shopify Plus', logo: getTrustedByLogo('shopify.svg') },
  { id: 10, name: 'Meta Business', logo: getTrustedByLogo('meta.svg') },
  { id: 11, name: 'Claude', logo: getTrustedByLogo('claude.svg') }
];

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <section className="relative h-screen w-full overflow-hidden bg-base-primary">
      {/* Video Background */}
      <div className="absolute inset-0">
  <div className="absolute inset-0 bg-black/60 z-10" />
  <OptimizedVideo
    sources={[
      { src: '/videos/hero-background.webm', type: 'video/webm' },
      { src: '/videos/hero-background.mp4', type: 'video/mp4' }
    ]}
    poster="/images/hero-poster.jpg"
    className="w-full h-full object-cover"
  />
</div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <ScrollAnimation direction="down" delay={0.1} className="mb-16">
          <Logo className="w-32 h-auto" isWhite />
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2} className="max-w-[1000px]">
          <H1 className="text-white mb-6 leading-tight tracking-tight">
            {t('hero.title')}
          </H1>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.4} className="max-w-[800px]">
          <LeadText className="text-white/90 mb-12">
            {t('hero.subtitle')}
          </LeadText>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.6} className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate('/kontakt')}
            variant="primary"
            size="large"
          >
            {t('hero.cta.start')}
          </Button>
          <Button
            onClick={() => {
              const packagesSection = document.querySelector('.package-comparison');
              if (packagesSection) {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            variant="secondary"
            size="large"
          >
            {t('hero.cta.discover')}
          </Button>
        </ScrollAnimation>
      </div>

      {/* Partners Section - Improved */}
      <div className="absolute bottom-0 w-full z-20 bg-gradient-to-t from-black/40 to-transparent hidden md:block">
      <div className="container mx-auto py-8">
          <BodyText className="text-center font-semibold text-white mb-6">
            {t('hero.trusted')}
          </BodyText>
          
          {/* Improved Logo Carousel */}
          <div className="overflow-hidden h-20"> {/* Fixed height container */}
            <motion.div
              className="flex gap-16 items-center justify-center"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {partners.concat(partners).map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex items-center justify-center min-w-[120px]" // Minimum width for logos
                >
                  <img
                    src={partner.logo || '/trustedby/default-logo.svg'}
                    alt={partner.name}
                    className="w-auto h-12 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>              
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;