'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useTranslation } from '@/lib/hooks/useTranslation';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success(t('contact.form.success'));
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const errorClasses = "mt-1 text-sm text-red-600 dark:text-red-400";

  return (
    <Card glass className="max-w-2xl mx-auto">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              <UserIcon className="inline w-4 h-4 mr-1" />
              {t('contact.form.name')}
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { 
                required: 'Ce champ est requis',
                minLength: { value: 2, message: 'Minimum 2 caractères' }
              })}
              className={inputClasses}
              placeholder="John Doe"
            />
            {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              <EnvelopeIcon className="inline w-4 h-4 mr-1" />
              {t('contact.form.email')}
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
              className={inputClasses}
              placeholder="john@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className={labelClasses}>
              <PhoneIcon className="inline w-4 h-4 mr-1" />
              {t('contact.form.phone')} (Optionnel)
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={inputClasses}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div>
            <label htmlFor="subject" className={labelClasses}>
              {t('contact.form.subject')}
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject', { 
                required: 'Ce champ est requis',
                minLength: { value: 3, message: 'Minimum 3 caractères' }
              })}
              className={inputClasses}
              placeholder="Projet web, Marketing, etc."
            />
            {errors.subject && <p className={errorClasses}>{errors.subject.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            <ChatBubbleLeftIcon className="inline w-4 h-4 mr-1" />
            {t('contact.form.message')}
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', { 
              required: 'Ce champ est requis',
              minLength: { value: 10, message: 'Minimum 10 caractères' }
            })}
            className={inputClasses + " resize-none"}
            placeholder="Décrivez votre projet ou votre demande..."
          />
          {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
          </Button>
        </div>
      </motion.form>
    </Card>
  );
}
