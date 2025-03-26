
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartIcon from '../cart/CartIcon';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="fixed top-4 right-14 z-50">
        <CartIcon />
      </div>
      <Navbar />
      <main className="flex-grow pt-16 text-gray-800">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
