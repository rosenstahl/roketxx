import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { H1, H2, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { GlassEffect } from '@/components/ui/GlassEffect';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <ScrollAnimation>
        <GlassEffect className="max-w-2xl mx-auto p-8 text-center relative z-10">
          <H1 className="text-8xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
            {t('notFound.title')}
          </H1>
          <H2 className="text-3xl font-semibold text-white mb-6">
            {t('notFound.heading')}
          </H2>
          <BodyText className="text-white mb-8 max-w-lg mx-auto">
            {t('notFound.description')}
          </BodyText>
          <div className="space-y-4">
            <Link to="/">
              <Button
                variant="primary"
                size="large"
                className="w-full sm:w-auto"
              >
                {t('notFound.button')}
              </Button>
            </Link>
          </div>
        </GlassEffect>
      </ScrollAnimation>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;