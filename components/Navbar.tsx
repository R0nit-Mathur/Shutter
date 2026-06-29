'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  session: any; // We receive the session object from the server component
}

export default function Navbar({ session }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-[#05070A]/90 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-[#70a3ff] shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-brand-bg fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] text-white font-sans group-hover:text-accent transition-colors">
              SHUTTER
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Platform', href: '/#platform' },
              { label: 'Use Cases', href: '/#use-cases' },
              { label: 'AI Audit', href: '/dashboard' },
              { label: 'Blog', href: '/blog' },
              { label: 'Docs', href: '/docs' },
              { label: 'Book Demo', href: '/#book-demo' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Dynamic Auth Section (Desktop) & Hamburger Menu (Mobile) */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-semibold text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="text-sm font-semibold text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    aria-label="Log out from your account"
                    className="text-sm font-semibold text-text-secondary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Logout
                  </button>
                  
                  {/* User Avatar */}
                  {user.image ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src={user.image}
                        alt={user.name || 'User Profile'}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-semibold text-accent">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-text-secondary hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    aria-label="Get started with Shutter"
                    className="flex items-center justify-center bg-white text-brand-bg hover:bg-white/90 font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block md:hidden text-text-secondary hover:text-white transition-colors p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Toggle Menu"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
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
            className="fixed inset-0 z-40 bg-[#05070A] pt-24 px-6 flex flex-col justify-between pb-12 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl font-light">
              {[
                { label: 'Platform', href: '/#platform' },
                { label: 'Use Cases', href: '/#use-cases' },
                { label: 'AI Audit', href: '/dashboard' },
                { label: 'Blog', href: '/blog' },
                { label: 'Docs', href: '/docs' },
                { label: 'Book Demo', href: '/#book-demo' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-white transition-colors py-2 border-b border-white/[0.03]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/[0.05] pt-8">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    {user.image && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src={user.image}
                          alt={user.name || 'User Profile'}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm text-white font-medium">{user.name || user.email}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-base text-text-secondary hover:text-white py-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="text-base text-text-secondary hover:text-white py-2"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-left text-base text-accent font-semibold py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3.5 border border-white/20 text-white font-semibold rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3.5 bg-white text-brand-bg font-semibold rounded-full"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
