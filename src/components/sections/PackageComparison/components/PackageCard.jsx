// src/components/sections/PackageComparison/components/PackageCard.jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { H3, BodyText } from '@/components/common/Typography';
import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';

const PackageCard = ({ pkg, index, isSelected, onClick }) => {
  const { t } = useTranslation('common');
  const IconComponent = icons.packages[pkg.id];
  const discount = pkg.id !== 'growth' ? pkg.originalPrice - parseInt(pkg.price) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div 
        className="h-full rounded-xl cursor-pointer"
        style={{ background: colors.packages[pkg.id] }}
        onClick={() => onClick(pkg.id)}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-white/20 backdrop-blur-sm">
              <IconComponent size={20} className="text-white" />
            </div>
            {pkg.isPopular && (
              <span className="px-3 py-1 text-xs font-medium bg-white text-[#1F1E1C] rounded-full">
                {t('packages.popular')}
              </span>
            )}
          </div>

          {/* Content */}
          <div>
            <H3 className="text-white mb-1">
              {pkg.title}
            </H3>
            
            {/* Price Section */}
{/* Price Section */}
<div className="mb-2">
  {pkg.id !== 'growth' && (
    <div className="font-sf text-sm text-white/80 line-through">
      {pkg.originalPrice}€
    </div>
  )}
  <div className="font-sf text-2xl font-bold text-white flex items-center gap-2">
    {pkg.id === 'growth' ? (
      t('packages.onRequest')
    ) : (
      <>
        {t('packages.startPrice')} {pkg.price}€
        {discount > 0 && (
          <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
            -{discount}€
          </span>
        )}
      </>
    )}
  </div>
</div>            
            <BodyText className="text-white/90 mb-4">
              {pkg.idealFor}
            </BodyText>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {pkg.features.slice(0, 2).map((section, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90">
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <BodyText className="text-white/90">
                    {section.title}
                  </BodyText>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 
                               text-white text-sm font-medium py-2 px-4 rounded-lg transition-all group">
                Details anzeigen
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;