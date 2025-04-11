import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Check } from 'lucide-react';
import { H3, H4, BodyText } from '@/components/common/Typography';
import Button from '@/components/ui/Button';
import { packages } from '@/components/sections/PackageComparison/packageData';
import { sendEmail } from '@/services/emailService';
import { trackError } from '@/utils/errorTracking';

const FormInput = ({ label, error, name, className = '', ...props }) => {
  return (
    <div className={className}>
      <label 
        className="block text-main-tertiary text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        data-testid={`input-${name}`}  // bereits vorhanden
        className={`
          w-full bg-white border-2 transition-all duration-200
          ${error ? 'border-red-500' : 'border-main-tertiary/10'}
          rounded-xl px-4 py-3 text-main-secondary placeholder-main-tertiary/50
          focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary
        `}
        {...props}
      />
      {error && (
        <motion.p 
          data-testid={`error-${name}`}  // Diese Zeile fehlt noch
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const FormTextarea = ({ label, error, name, className = '', ...props }) => {
  return (
    <div className={className}>
      <label 
        className="block text-main-tertiary text-sm font-medium mb-2"
      >
        {label}
      </label>
      <textarea
        data-testid={`input-${name}`}  // bereits vorhanden
        className={`
          w-full bg-white border-2 transition-all duration-200
          ${error ? 'border-red-500' : 'border-main-tertiary/10'}
          rounded-xl px-4 py-3 text-main-secondary placeholder-main-tertiary/50
          focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary
          min-h-[120px] resize-y
        `}
        {...props}
      />
      {error && (
        <motion.p 
          data-testid={`error-${name}`}  // Diese Zeile fehlt noch
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const PackageOption = ({ pkg, isSelected, onSelect }) => {
  const { t } = useTranslation('common');
  const description = t(`contactForm.packageDescriptions.${pkg.id}`);

  return (
    <motion.div
      onClick={() => onSelect()} // Einfacher Click-Handler
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        cursor-pointer
        relative w-full p-4 rounded-xl text-left transition-all duration-300 border 
        group overflow-hidden
        ${isSelected 
          ? 'bg-white border-2 shadow-sm' 
          : 'bg-white hover:border-main-tertiary/30 border-main-tertiary/10'
        }
      `}
      style={{
        borderColor: isSelected ? pkg.color : undefined
      }}
    >
      {isSelected && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(45deg, ${pkg.color}22, transparent)`
          }}
        />
      )}
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <H4 className={`
            font-semibold text-base transition-colors duration-300
            ${isSelected ? 'text-main-secondary' : 'text-main-secondary/80'}
          `}>
            {pkg.title}
          </H4>
          {pkg.isPopular && (
            <span className="px-2 py-0.5 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full">
              {t('contactForm.fields.package.popular')}
            </span>
          )}
        </div>

        <BodyText className={`
          text-sm transition-colors duration-300
          ${isSelected ? 'text-main-tertiary' : 'text-main-tertiary/70'}
        `}>
          {description}
        </BodyText>
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: pkg.color }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const SuccessState = () => {
  const { t } = useTranslation('common');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-primary/10 flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-accent-primary" />
      </motion.div>
      <H3 className="text-main-secondary mb-4">
        {t('contactForm.success.title')}
      </H3>
      <BodyText className="text-main-tertiary">
        {t('contactForm.success.message')}
      </BodyText>
    </motion.div>
  );
};

export default function ContactForm() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    package: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('contactForm.fields.name.error');
    if (!formData.email) {
      newErrors.email = t('contactForm.fields.email.error');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contactForm.fields.email.invalid');
    }
    if (!formData.message) newErrors.message = t('contactForm.fields.message.error');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendEmail(formData, 'contact');
      setSuccess(true);
    } catch (err) {
      trackError(err, {                    // NEUE ZEILEN
        formData: {                        // NEUE ZEILEN
          ...formData,                     // NEUE ZEILEN
          email: 'PRIVATE',                // NEUE ZEILEN
          message: 'PRIVATE'               // NEUE ZEILEN
        },                                 // NEUE ZEILEN
        form: 'contact-form'               // NEUE ZEILEN
      });                                  // NEUE ZEILEN
      setErrors(prev => ({ ...prev, submit: t('contact.form.error.generic') }));
    } finally {
      setLoading(false);
    }
  };
    
  if (success) {
    return <SuccessState />;
  }

  return (
<form onSubmit={handleSubmit} className="p-8 space-y-6">
  <div className="grid md:grid-cols-2 gap-6">
  <FormInput
  name="name"
  label={t('contactForm.fields.name.label')}
  value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}
  placeholder={t('contactForm.fields.name.placeholder')}
  error={errors.name}
  required
/>
    <FormInput
      name="email"
      label={t('contactForm.fields.email.label')}
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({...formData, email: e.target.value})}
      placeholder={t('contactForm.fields.email.placeholder')}
      error={errors.email}
      required
    />
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <FormInput
      name="phone"
      label={t('contactForm.fields.phone.label')}
      type="tel"
      value={formData.phone}
      onChange={(e) => setFormData({...formData, phone: e.target.value})}
      placeholder={t('contactForm.fields.phone.placeholder')}
    />
    <FormInput
      name="company"
      label={t('contactForm.fields.company.label')}
      value={formData.company}
      onChange={(e) => setFormData({...formData, company: e.target.value})}
      placeholder={t('contactForm.fields.company.placeholder')}
    />
  </div>

  <div>
    <label className="block text-main-tertiary text-sm font-medium mb-3">
      {t('contactForm.fields.package.label')}
    </label>
    <div className="grid md:grid-cols-2 gap-4">
      {packages.map((pkg) => (
        <PackageOption
          key={pkg.id}
          pkg={pkg}
          isSelected={formData.package === pkg.id}
          onSelect={() => setFormData({...formData, package: pkg.id})}
        />
      ))}
    </div>
  </div>

  <FormTextarea
    name="message"
    label={t('contactForm.fields.message.label')}
    value={formData.message}
    onChange={(e) => setFormData({...formData, message: e.target.value})}
    placeholder={t('contactForm.fields.message.placeholder')}
    error={errors.message}
    required
  />

  <div className="flex justify-end">
    <Button
      type="submit"
      variant="primary"
      disabled={loading}
      className="min-w-[200px]"
      data-testid="submit-button"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          {t('contactForm.submit.sending')}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {t('contactForm.submit.button')}
          <Send size={16} />
        </span>
      )}
    </Button>
  </div>
</form>
  );
}