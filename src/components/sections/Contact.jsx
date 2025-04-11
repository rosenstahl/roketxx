import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, Rocket, Laptop, Paintbrush, TrendingUp, ArrowRight } from 'lucide-react';
import { packages } from '@/components/sections/PackageComparison/packageData';
import { sendEmail } from '@/services/emailService';
import { trackError } from '@/utils/errorTracking';

// Package Colors - konsistent mit PackageComparison
const packageColors = {
  startup: '#FF7043',
  digital: '#007AFF',
  makeover: '#00B27A',
  growth: '#9C27B0'
};

// Progress Steps Component
const ProgressSteps = ({ currentStep }) => {
  const { t } = useTranslation('common');
  
  const steps = [
    { number: 1, label: t('contact.steps.package') },
    { number: 2, label: t('contact.steps.contact') },
    { number: 3, label: t('contact.steps.message') }
  ];

  return (
    <div className="flex justify-between items-center mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <motion.div 
            className={`relative flex flex-col items-center ${
              currentStep >= step.number ? 'text-white' : 'text-white/40'
            }`}
            animate={currentStep >= step.number ? { scale: [1, 1.1, 1] } : {}}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mb-2
              ${currentStep >= step.number ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/5'}
              transition-all duration-300
            `}>
              {step.number}
            </div>
            <span className="absolute -bottom-6 text-sm whitespace-nowrap font-medium">
              {step.label}
            </span>
          </motion.div>
          {index < steps.length - 1 && (
            <div className={`
              w-full h-0.5 mx-10
              ${currentStep > step.number ? 'bg-white/20' : 'bg-white/5'}
              transition-all duration-300
            `} />
          )}
        </div>
      ))}
    </div>
  );
};

const PackageSelector = ({ selectedPackage, onSelect }) => {
  const { t } = useTranslation('common');
  
  const packages = [
    {
      id: 'startup',
      title: t('packages.items.startup.title'),
      idealFor: t('packages.items.startup.idealFor'),
      isPopular: t('packages.items.startup.isPopular'),
    },
    {
      id: 'digital',
      title: t('packages.items.digital.title'),
      idealFor: t('packages.items.digital.idealFor'),
      isPopular: t('packages.items.digital.isPopular'),
    },
    {
      id: 'makeover',
      title: t('packages.items.makeover.title'),
      idealFor: t('packages.items.makeover.idealFor'),
      isPopular: t('packages.items.makeover.isPopular'),
    },
    {
      id: 'growth',
      title: t('packages.items.growth.title'),
      idealFor: t('packages.items.growth.idealFor'),
      isPopular: t('packages.items.growth.isPopular'),
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {packages.map((pkg) => {
        const isSelected = selectedPackage === pkg.id;
        return (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => onSelect(pkg.id)}
            className="h-full"
          >
            <div 
              className={`
                h-full rounded-xl cursor-pointer relative
                transition-all duration-300
                ${isSelected ? 'ring-2 ring-white shadow-lg scale-[1.02]' : 'hover:ring-1 hover:ring-white/50'}
              `}
              style={{ background: packageColors[pkg.id] }}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Check size={14} style={{ color: packageColors[pkg.id] }} />
                </div>
              )}

              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-lg bg-white/20 backdrop-blur-sm">
                    {pkg.id === 'startup' ? <Rocket size={20} className="text-white" /> :
                     pkg.id === 'digital' ? <Laptop size={20} className="text-white" /> :
                     pkg.id === 'makeover' ? <Paintbrush size={20} className="text-white" /> :
                     <TrendingUp size={20} className="text-white" />}
                  </div>
                  {pkg.isPopular && (
                    <span className="px-3 py-1 text-xs font-medium bg-white text-[#1F1E1C] rounded-full">
                      {t('contact.packageSelector.popular')}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-sf text-xl text-white font-bold mb-1">
                    {pkg.title}
                  </h3>
                  <p className="font-inter text-sm text-white/90">
                    {pkg.idealFor}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, error, className = '', ...props }) => (
  <div className={className}>
    <label className="block text-white/80 text-sm font-medium mb-2">{label}</label>
    <input
      className={`w-full bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} 
                 rounded-lg px-4 py-2.5 text-white placeholder-white/40 
                 focus:outline-none focus:ring-2 focus:ring-white/20
                 transition-all duration-200`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Form Textarea Component
const FormTextarea = ({ label, error, className = '', ...props }) => (
  <div className={className}>
    <label className="block text-white/80 text-sm font-medium mb-2">{label}</label>
    <textarea
      className={`w-full bg-white/10 border ${error ? 'border-red-500' : 'border-white/20'} 
                 rounded-lg px-4 py-2.5 text-white placeholder-white/40 
                 focus:outline-none focus:ring-2 focus:ring-white/20
                 transition-all duration-200 min-h-[120px] resize-y`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Main Contact Component
const Contact = () => {
  const { t } = useTranslation('common');
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1 && !selectedPackage) {
      newErrors.package = t('contact.packageSelector.error');
    }

    if (currentStep === 2) {
      if (!formData.name) newErrors.name = t('contact.form.contact.name.error');
      if (!formData.email) {
        newErrors.email = t('contact.form.contact.email.error');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('contact.form.contact.email.invalid');
      }
    }

    if (currentStep === 3 && !formData.privacy) {
      newErrors.privacy = t('contact.form.privacy.error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
  
    setLoading(true);
    try {
      await sendEmail({
        ...formData,
        selectedPackage
      }, 'landing');
      setStep(4);
    } catch (err) {
      trackError(err, {                     // NEUE ZEILEN
        formData: {                         // NEUE ZEILEN
          ...formData,                      // NEUE ZEILEN
          email: 'PRIVATE',                 // NEUE ZEILEN
          message: 'PRIVATE',               // NEUE ZEILEN
          selectedPackage                   // NEUE ZEILEN
        },                                  // NEUE ZEILEN
        form: 'contact-section'             // NEUE ZEILEN
      });                                   // NEUE ZEILEN
      setErrors({ submit: t('contact.form.error.generic') });
    } finally {
      setLoading(false);
    }
  };  
  return (
    <section className="relative min-h-screen bg-[#171614] py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-sf text-5xl font-bold text-white mb-4">
            {t('contact.header.title')}
          </h2>
          <p className="font-inter text-xl text-white/80">
            {t('contact.header.subtitle')}
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <ProgressSteps currentStep={step} />

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  key="step1"
                >
                  <h3 className="font-sf text-2xl font-bold text-white mb-8">
                    {t('contact.packageSelector.title')}
                  </h3>
                  <PackageSelector 
                    selectedPackage={selectedPackage}
                    onSelect={setSelectedPackage}
                  />
                  {errors.package && (
                    <p className="mt-4 text-sm text-red-500">{errors.package}</p>
                  )}
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleNext}
                      disabled={!selectedPackage}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-colors
                        ${!selectedPackage 
                          ? 'bg-white/50 text-[#1F1E1C]/50 cursor-not-allowed' 
                          : 'bg-white text-[#1F1E1C] hover:bg-white/90'}`}
                    >
                      {t('contact.buttons.next')}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  key="step2"
                >
                  <h3 className="font-sf text-2xl font-bold text-white mb-8">
                    {t('contact.form.contact.title')}
                  </h3>
                  <div className="space-y-6">
                    <FormInput
                      label={t('contact.form.contact.name.label')}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      error={errors.name}
                      required
                    />
                    <FormInput
                      label={t('contact.form.contact.email.label')}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      error={errors.email}
                      required
                    />
                    <FormInput
                      label={t('contact.form.contact.phone.label')}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handleBack}
                      className="px-6 py-2.5 bg-white/10 text-white rounded-lg font-medium
                               hover:bg-white/20 transition-colors"
                    >
                      {t('contact.buttons.back')}
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-white text-[#1F1E1C] rounded-lg font-medium
                               hover:bg-white/90 transition-colors"
                    >
                      {t('contact.buttons.next')}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  key="step3"
                >
                  <h3 className="font-sf text-2xl font-bold text-white mb-8">
                    {t('contact.form.message.title')}
                  </h3>
                  <div className="space-y-6">
                    <FormTextarea
                      label={t('contact.form.message.label')}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t('contact.form.message.placeholder')}
                      rows={5}
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={formData.privacy}
                        onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600
                                 focus:ring-2 focus:ring-white/20"
                      />
<label htmlFor="privacy" className="text-white/80 text-sm">
  {t('contact.form.privacy.label')}{' '}
  <a href="/datenschutz" className="text-white hover:underline">
    {t('contact.form.privacy.link')}
  </a>
</label>
</div>
{errors.privacy && (
<p className="text-sm text-red-500">{errors.privacy}</p>
)}
</div>

{errors.submit && (
<div className="mt-4 p-4 bg-red-500/10 rounded-lg">
<p className="text-sm text-red-500">{errors.submit}</p>
</div>
)}

<div className="flex justify-between mt-8">
<button
onClick={handleBack}
className="px-6 py-2.5 bg-white/10 text-white rounded-lg font-medium
         hover:bg-white/20 transition-colors"
>
{t('contact.buttons.back')}
</button>
<button
onClick={handleSubmit}
disabled={loading}
className="px-6 py-2.5 bg-white text-[#1F1E1C] rounded-lg font-medium
         hover:bg-white/90 transition-colors flex items-center gap-2"
>
{loading ? (
  <>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-4 h-4 border-2 border-[#1F1E1C] border-t-transparent rounded-full"
    />
    {t('contact.buttons.sending')}
  </>
) : (
  <>
    <ArrowRight size={16} />
    {t('contact.buttons.submit')}
  </>
)}
</button>
</div>
</motion.div>
)}

{step === 4 && (
<motion.div
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
key="success"
className="text-center py-8"
>
<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1 }}
className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center"
>
<Check className="w-8 h-8 text-white" />
</motion.div>
<h3 className="font-sf text-2xl font-bold text-white mb-4">
{t('contact.success.title')}
</h3>
<p className="font-inter text-lg text-white/80">
{t('contact.success.message')}
</p>
</motion.div>
)}
</AnimatePresence>
</div>
</div>
</div>
</section>
);
};

export default Contact;