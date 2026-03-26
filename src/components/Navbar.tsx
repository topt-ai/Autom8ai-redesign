import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Live Systems', href: '#live-systems' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090E]/85 backdrop-blur-md border-b border-[#1A2535]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="content-width flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="font-display font-bold text-2xl tracking-tight text-text-1">
          autom8<span className="text-signal">ai</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-2 hover:text-text-1 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-block border border-signal text-signal px-5 py-2.5 rounded-md text-sm font-medium hover:bg-signal hover:text-void transition-colors duration-200"
          >
            Book a Free Call
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text-1 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-void z-40 flex flex-col items-center pt-12 gap-8 border-t border-border-color">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium text-text-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 border border-signal text-signal px-8 py-3 rounded-md text-lg font-medium hover:bg-signal hover:text-void transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Free Call
          </a>
        </div>
      )}
    </nav>
  );
}
