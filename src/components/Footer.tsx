import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-void border-t border-border-color pt-16 pb-8">
      <div className="content-width">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <a href="#" className="font-display font-bold text-2xl tracking-tight text-text-1">
            autom8<span className="text-signal">ai</span>
          </a>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="#services" className="text-sm font-medium text-text-2 hover:text-text-1 transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-text-2 hover:text-text-1 transition-colors">
              How It Works
            </a>
            <a href="#live-systems" className="text-sm font-medium text-text-2 hover:text-text-1 transition-colors">
              Live Systems
            </a>
          </div>

          <a href="#contact" className="text-sm font-medium text-signal hover:text-[#00EEFF] transition-colors">
            Book a Call &rarr;
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border-color/50 text-text-3 text-sm">
          <p>© 2026 autom8ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-2 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-text-2 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
