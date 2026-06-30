'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Determine theme on client mount
    const isLight = document.documentElement.classList.contains('dark') === false;
    setTheme(isLight ? 'light' : 'dark');
    setMounted(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-brand-bg/80 backdrop-blur-md border-b border-card-border py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/shutter_logo.png" 
              alt="Shutter Logo" 
              className="w-7 h-7 object-contain rounded-md"
            />
            <span className="text-xs font-bold tracking-[0.35em] text-text-primary font-mono uppercase">
              SHUTTER
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Platform', href: '/#platform' },
              { label: 'Use Cases', href: '/#use-cases' },
              { label: 'Integrations', href: '/#integrations' },
              { label: 'Pricing', href: '/#pricing' },
              { label: 'FAQ', href: '/#faq' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-card-border hover:bg-bg-secondary text-text-primary transition-all duration-200 cursor-pointer flex items-center justify-center w-8 h-8"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}
            <Link
              href="/#book-demo"
              className="flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-medium text-xs px-5 py-2 rounded-full transition-all duration-200"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 flex flex-col justify-between pb-12 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-light">
              {[
                { label: 'Platform', href: '/#platform' },
                { label: 'Use Cases', href: '/#use-cases' },
                { label: 'Integrations', href: '/#integrations' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'FAQ', href: '/#faq' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors py-2 border-b border-card-border"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-card-border pt-8">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="w-full text-center py-2.5 border border-card-border text-text-primary rounded-full text-xs font-semibold flex items-center justify-center gap-2"
                >
                  {theme === 'dark' ? "Light Mode" : "Dark Mode"}
                </button>
              )}
              <Link
                href="/#book-demo"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 bg-accent text-white font-medium rounded-full text-xs"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
