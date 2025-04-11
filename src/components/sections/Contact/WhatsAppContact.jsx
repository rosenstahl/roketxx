import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { H3, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { Phone, Clock, ChevronLeft, MessageCircle, Smartphone } from 'lucide-react';

export default function WhatsAppContact({ onBack }) {
  const { t } = useTranslation('common');
  const phoneNumber = "+491738528482";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}`;
  const currentHour = new Date().getHours();
  const isBusinessHours = currentHour >= 9 && currentHour < 17;

  const getStatusBadge = () => {
    return (
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
          isBusinessHours
            ? 'bg-green-50 text-green-600'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isBusinessHours ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}
        />
        {isBusinessHours 
          ? t('whatsappContact.status.available') 
          : t('whatsappContact.status.unavailable')}
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <H3 className="text-green-600 mb-3">
            {t('whatsappContact.title')}
          </H3>
          <BodyText className="text-gray-500">
            {t('whatsappContact.subtitle')}
          </BodyText>
        </div>

        {/* Status & Business Hours */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {getStatusBadge()}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500">
            <Clock size={14} />
            <span>{t('whatsappContact.status.hours')}</span>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Mobile WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="mb-6 p-4 bg-green-100 rounded-full">
              <Smartphone size={48} className="text-green-500" />
            </div>
            <H3 className="text-green-600 text-lg mb-2">
              {t('whatsappContact.mobile.title')}
            </H3>
            <BodyText className="text-sm text-gray-500 mb-6">
              {t('whatsappContact.mobile.description')}
            </BodyText>
            <Button
              variant="primary"
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="w-full justify-center bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              <MessageCircle size={18} className="mr-2" />
              {t('whatsappContact.mobile.button')}
            </Button>
          </motion.div>

          {/* Direct Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone size={20} className="text-green-500" />
                  </div>
                  <div className="font-medium text-green-600">
                    {phoneNumber}
                  </div>
                </div>
                <BodyText className="text-sm text-gray-500">
                  {t('whatsappContact.call.description')}
                </BodyText>
              </div>

              <div className="space-y-3 mt-auto">
                <Button
                  variant="primary"
                  onClick={() => navigator.clipboard.writeText(phoneNumber)}
                  className="w-full justify-center bg-green-500 hover:bg-green-600 text-white rounded-full"
                >
                  {t('whatsappContact.call.copyButton')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.open(`tel:${phoneNumber}`, '_blank')}
                  className="w-full justify-center text-green-500 hover:text-green-600"
                >
                  <Phone size={18} className="mr-2" />
                  {t('whatsappContact.call.callButton')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Out-of-business-hours Notice */}
        {!isBusinessHours && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 rounded-xl p-4 mb-8"
          >
            <BodyText className="text-sm text-gray-500">
              {t('whatsappContact.outOfHours')}
            </BodyText>
          </motion.div>
        )}
      </div>
    </div>
  );
}