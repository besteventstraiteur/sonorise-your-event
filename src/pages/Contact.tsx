
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactCards from '@/components/contact/ContactCards';
import ContactForm from '@/components/contact/ContactForm';
import ContactTestimonials from '@/components/contact/ContactTestimonials';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <link 
          rel="preload" 
          href="/lovable-uploads/photo-1581091226825-a6a2a5aee158"
          as="image"
          type="image/jpeg"
        />
      </Helmet>
      
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <header>
            <ContactHeader />
          </header>
          
          <section aria-label="Informations de contact">
            <ContactCards />
          </section>
          
          <section aria-label="Témoignages clients">
            <ContactTestimonials />
          </section>
          
          <section aria-label="Formulaire de contact">
            <ContactForm />
          </section>
        </motion.div>
      </main>
    </>
  );
};

export default ContactPage;
