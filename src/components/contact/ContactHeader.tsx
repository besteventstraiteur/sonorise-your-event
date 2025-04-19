
import React from 'react';
import { motion } from 'framer-motion';

const ContactHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-sonic-900 mb-4">
        Transformez votre<span className="text-pink-600"> événement</span>
      </h1>
      <div className="text-lg text-sonic-700 max-w-2xl mx-auto space-y-4">
        <p className="font-medium">
          Experts en sonorisation et animation depuis 15 ans dans le Var
        </p>
        <ul className="inline-flex flex-wrap justify-center gap-4 text-sm font-medium">
          <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Devis gratuit sous 24h</li>
          <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Matériel haut de gamme</li>
          <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Installation incluse</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactHeader;
