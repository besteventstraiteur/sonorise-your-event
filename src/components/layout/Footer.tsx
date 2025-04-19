import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="text-black pt-16 pb-8 bg-[#fbfdfd]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img alt="Sonorisation 83" className="h-12" src="/lovable-uploads/2977994c-f06e-4414-bb25-0af6975425c4.png" />
            </div>
            <p className="mb-4 text-zinc-950">
              L'excellence sonore et l'élégance événementielle à votre service. Avec notre équipe passionnée, créez des moments inoubliables.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/sonorisation83/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/sonorisation_83/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-black hover:text-pink-500 transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="text-black hover:text-pink-500 transition-colors">Nos services</Link></li>
              <li><Link to="/location" className="text-black hover:text-pink-500 transition-colors">Location</Link></li>
              <li><Link to="/boutique" className="text-black hover:text-pink-500 transition-colors">Boutique</Link></li>
              <li><Link to="/a-propos" className="text-black hover:text-pink-500 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-black hover:text-pink-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/dj" className="text-black hover:text-pink-500 transition-colors">DJ professionnels</Link></li>
              <li><Link to="/services/animation" className="text-black hover:text-pink-500 transition-colors">Animation événementielle</Link></li>
              <li><Link to="/services/artistes" className="text-black hover:text-pink-500 transition-colors">Artistes</Link></li>
              <li><Link to="/location/son" className="text-black hover:text-pink-500 transition-colors">Location sono</Link></li>
              <li><Link to="/location/eclairage" className="text-black hover:text-pink-500 transition-colors">Location éclairage</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact</h3>
            <ul className="space-y-4 text-black">
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-pink-500 group-hover:text-pink-400 transition-colors" />
                <div>
                  <p className="font-medium text-black mb-1">Adresse</p>
                  <p className="text-sm text-black">424 avenue de l'Europe<br />83300 Draguignan</p>
                </div>
              </li>
              <li>
                <a href="tel:0483110181" className="flex items-start group">
                  <Phone className="w-5 h-5 mr-2 mt-0.5 text-pink-500 group-hover:text-pink-400 transition-colors" />
                  <div>
                    <p className="font-medium text-black mb-1">Téléphone</p>
                    <p className="text-sm text-black">04.83.11.01.81</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:contact@sonorisation-83.com" className="flex items-start group">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 text-pink-500 group-hover:text-pink-400 transition-colors" />
                  <div>
                    <p className="font-medium text-black mb-1">Email</p>
                    <p className="text-sm text-black">contact@sonorisation-83.com</p>
                  </div>
                </a>
              </li>
              <li className="pt-2">
                <p className="text-sm text-black">Zone d'intervention : Région PACA</p>
                <p className="text-sm text-black mt-2">SIREN : 830 733 960</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} sonorisation-83.com | Tous droits réservés
            </p>
            <div className="flex space-x-6">
              <Link to="/mentions-legales" className="text-black text-sm hover:text-pink-500 transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-black text-sm hover:text-pink-500 transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cgv" className="text-black text-sm hover:text-pink-500 transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;