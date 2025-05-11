'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('contact.error.name');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.error.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.error.emailInvalid');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.error.message');
    } else if (formData.message.length < 10) {
      newErrors.message = t('contact.error.messageLength');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="max-w-2xl mx-auto"
    >
      <form 
        action="https://formspree.io/f/xjkweyva"
        method="POST"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-[#181c24] shadow-2xl rounded-2xl p-8 border border-gray-800"
        aria-label="Formulario de contacto"
        onSubmit={e => {
          if (!validateForm()) {
            e.preventDefault();
            setSubmitStatus('error');
          } else {
            setSubmitStatus('success');
          }
        }}
      >
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div 
            className="col-span-1 md:col-span-2 p-4 mb-4 bg-green-500/20 border border-green-500 rounded text-green-500 text-center flex items-center justify-center gap-2"
            role="alert"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t('contact.success')}
          </div>
        )}
        {submitStatus === 'error' && (
          <div 
            className="col-span-1 md:col-span-2 p-4 mb-4 bg-red-500/20 border border-red-500 rounded text-red-500 text-center flex items-center justify-center gap-2"
            role="alert"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            {t('contact.error')}
          </div>
        )}

        {/* Name Field */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
            {t('contact.name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder={t('contact.namePlaceholder') || t('contact.name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
            {t('contact.email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder={t('contact.emailPlaceholder') || t('contact.email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400 border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder={t('contact.messagePlaceholder') || t('contact.message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-500 transition-all duration-200 py-2 px-6 rounded flex items-center justify-center font-semibold text-white text-lg mt-2 shadow-lg`}
        >
          {t('contact.send')}
        </motion.button>

        {/* Separador antes de redes sociales */}
        <div className="col-span-1 md:col-span-2 flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-sm">{t('contact.orFindMe')}</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Redes sociales */}
        <div className="col-span-1 md:col-span-2 flex justify-center gap-8 mt-2">
          <a
            href="https://github.com/Lauti-Tapia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-400 transition"
          >
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.372.823 1.104.823 2.226 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/lautaro-tapia-9012091b8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-400 transition"
          >
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
            </svg>
          </a>
        </div>
      </form>
    </motion.div>
  );
} 