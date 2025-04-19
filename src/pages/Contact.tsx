
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
        <title>Contact | Sonorisation & DJ Mariage Var (83) - Sonorisation 83</title>
        <meta name="description" content="Contactez notre équipe de professionnels pour votre projet de sonorisation ou animation DJ dans le Var. Devis gratuit sous 24h, équipements haut de gamme. Plus de 15 ans d'expérience dans l'événementiel à Toulon et sa région." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact | Sonorisation & DJ Mariage Var (83) - Sonorisation 83" />
        <meta property="og:description" content="Contactez notre équipe de professionnels pour votre projet de sonorisation ou animation DJ dans le Var. Devis gratuit sous 24h, équipements haut de gamme." />
        <meta property="og:image" content="/lovable-uploads/photo-1581091226825-a6a2a5aee158" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Sonorisation & DJ Mariage Var (83) - Sonorisation 83" />
        <meta name="twitter:description" content="Contactez notre équipe de professionnels pour votre projet de sonorisation ou animation DJ dans le Var. Devis gratuit sous 24h." />
        <meta name="twitter:image" content="/lovable-uploads/photo-1581091226825-a6a2a5aee158" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="sonorisation var, dj mariage toulon, animation événementielle var, sonorisation 83, location sono var, contact dj var" />
        <link rel="canonical" href="https://sonorisation-83.fr/contact" />
        
        {/* Preload critical image */}
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
