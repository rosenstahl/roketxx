// src/components/sections/PackageComparison/components/DetailModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Check, ArrowRight } from 'lucide-react';
import { H2, H3, H4, BodyText } from '@/components/common/Typography';
import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';

const DetailModal = ({ pkg, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  if (!pkg) return null;

  const IconComponent = icons.packages[pkg.id];

  return (
    <AnimatePresence>
      {pkg && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 bg-white rounded-2xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div 
              className="p-6 md:p-8 flex-shrink-0"
              style={{ 
                background: colors.packages[pkg.id],
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-white/20 backdrop-blur-sm">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <H2 className="text-white">
                        {pkg.title}
                      </H2>
                      {pkg.isPopular && (
                        <motion.span 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 text-sm font-medium bg-white text-[#1F1E1C] rounded-full shadow-lg"
                        >
                          {t('packages.popular')}
                        </motion.span>
                      )}
                    </div>
                    <BodyText className="text-xl text-white/90 mb-1">
  {pkg.id === 'growth' ? (
    t('packages.onRequest')
  ) : (
    `${t('packages.startPrice')} ${pkg.price}€`
  )}
</BodyText>                    <BodyText className="text-white/80">
                      {pkg.idealFor}
                    </BodyText>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label={t('common.close')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 md:px-8 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.nr}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                    >
                      <H3 className="text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        {feature.nr}. {feature.title}
                      </H3>
                      <div className="space-y-6">
                        {feature.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <BodyText className="font-medium text-gray-800 mb-3">
                              {item.title}
                            </BodyText>
                            {item.subitems && item.subitems.length > 0 && (
                              <ul className="space-y-3">
                                {item.subitems.map((subitem, subIndex) => (
                                  <motion.li
                                    key={subIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (featureIndex * 0.1) + (subIndex * 0.05) }}
                                    className="flex items-start gap-3"
                                  >
                                    <div 
                                      className="p-0.5 rounded-full mt-1"
                                      style={{ background: `${colors.packages[pkg.id]}30` }}
                                    >
                                      <Check size={12} style={{ color: colors.packages[pkg.id] }} />
                                    </div>
                                    <BodyText className="text-gray-600 text-sm">
                                      {subitem}
                                    </BodyText>
                                  </motion.li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                <div>
                  <H4 className="text-gray-900 mb-2">
                    {t('packages.cta.ready')}
                  </H4>
                  <BodyText className="text-gray-600">
                    {t('packages.cta.support')}
                  </BodyText>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/kontakt')}
                  className="group flex items-center gap-2 px-8 py-3 rounded-xl text-white font-sf font-semibold 
                           transition-all duration-300"
                  style={{ background: colors.packages[pkg.id] }}
                >
                  {t('packages.cta.request')}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;