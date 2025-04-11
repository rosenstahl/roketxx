import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FooterHeading, FooterText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { Phone, Mail, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { GlassEffect } from '../ui/GlassEffect';

const hoverAnimation = {
  initial: { x: 0 },
  hover: { x: 4 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

const iconAnimation = {
  initial: { rotate: 0 },
  hover: { rotate: 12 },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 10
  }
};

const ContactLink = ({ href, icon: Icon, children }) => (
  <motion.a 
    href={href}
    className="group flex items-center gap-3 text-white hover:text-accent-primary transition-colors duration-300"
    whileHover="hover"
    initial="initial"
  >
    <motion.span 
      variants={iconAnimation}
      className="text-accent-primary/80 group-hover:text-accent-primary"
    >
      <Icon size={20} />
    </motion.span>
    <motion.span variants={hoverAnimation}>
      {children}
    </motion.span>
  </motion.a>
);

ContactLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

const LegalLink = ({ to, children }) => (
  <motion.div
    whileHover="hover"
    initial="initial"
    className="mt-6"
  >
    <Link 
      to={to} 
      className="block text-white/80 hover:text-accent-primary transition-colors duration-300"
    >
      <motion.span variants={hoverAnimation}>
        {children}
      </motion.span>
    </Link>
  </motion.div>
);

LegalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#171614] pt-8 pb-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <GlassEffect className="p-8 bg-white/[0.02] backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Logo & Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Logo className="w-32 h-auto mb-4" isWhite />
              <FooterText className="text-white/80">
                {t('footer.description')}
              </FooterText>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FooterHeading className="text-white font-sf text-xl font-semibold mb-8">
                {t('footer.contact.title')}
              </FooterHeading>
              <div className="space-y-4">
                <ContactLink 
                  href="tel:01738528482" 
                  icon={Phone}
                >
                  {t('footer.contact.phone')}
                </ContactLink>
                <ContactLink 
                  href="mailto:info@roketX.com"
                  icon={Mail}
                >
                  {t('footer.contact.email')}
                </ContactLink>
                <div className="flex gap-3 text-white/80">
                  <MapPin size={20} className="flex-shrink-0 text-accent-primary/80 mt-1" />
                  <address className="not-italic">
                    {t('footer.contact.address.street')}<br />
                    {t('footer.contact.address.city')}
                  </address>
                </div>
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FooterHeading className="text-white font-sf text-xl font-semibold mb-8">
                {t('footer.legal.title')}
              </FooterHeading>
              <nav>
                <LegalLink to="/impressum">{t('footer.legal.imprint')}</LegalLink>
                <LegalLink to="/agb">{t('footer.legal.terms')}</LegalLink>
                <LegalLink to="/datenschutz">{t('footer.legal.privacy')}</LegalLink>
              </nav>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FooterHeading className="text-white font-sf text-xl font-semibold">
                {t('footer.cta.title')}
              </FooterHeading>
              
              <Button
                variant="primary"
                size="default"
                onClick={() => window.location.href = '/kontakt'}
                className="w-full mt-9"
              >
                {t('footer.cta.button')}
              </Button>
            </motion.div>
          </div>
        </GlassEffect>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 pt-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <FooterText className="text-white/60">
              {t('footer.copyright', { year: currentYear })}
            </FooterText>

            <div className="flex items-center gap-6">
              <motion.a 
                href="https://instagram.com/roketx.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent-primary transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              
              <FooterText className="text-white/60">
                {t('footer.social.instagram')}
              </FooterText>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;