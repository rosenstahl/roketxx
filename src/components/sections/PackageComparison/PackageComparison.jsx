// src/components/sections/PackageComparison/PackageComparison.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { H2, LeadText } from '@/components/common/Typography';
import PackageCard from './components/PackageCard';
import DetailModal from './components/DetailModal';

const PackageComparison = () => {
  const { t } = useTranslation('common');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = ['startup', 'digital', 'makeover', 'growth'].map(id => ({
    id,
    title: t(`packages.items.${id}.title`),
    description: t(`packages.items.${id}.description`),
    price: t(`packages.items.${id}.price`),
    idealFor: t(`packages.items.${id}.idealFor`),
    isPopular: t(`packages.items.${id}.isPopular`),
    features: t(`packages.features.${id}.sections`, { returnObjects: true }),
    originalPrice: id === 'startup' ? 4999 :
                  id === 'digital' ? 3999 :
                  id === 'makeover' ? 3499 :
                  null
  }));

  const handleCardClick = (id) => {
    if (selectedPackage === id) {
      setIsModalOpen(true);
    } else {
      setSelectedPackage(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <section className="relative bg-base-primary py-24 overflow-hidden package-comparison">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <H2 className="text-main-secondary mb-4">
            {t('packages.header.title')}
          </H2>
          <LeadText className="max-w-2xl mx-auto">
            {t('packages.header.subtitle')}
          </LeadText>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              isSelected={selectedPackage === pkg.id}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* Modal */}
        <DetailModal
          pkg={packages.find(p => p.id === selectedPackage)}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-primary to-transparent" />
      </div>
    </section>
  );
};

export default PackageComparison;