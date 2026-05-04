'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: t.navbar.home },
    { href: '/#about', label: t.navbar.about },
    { href: '/#services', label: t.navbar.services },
    { href: '/#destinations', label: t.navbar.destinations },
    { href: '/#blog', label: t.navbar.blog },
    { href: '/contact', label: t.navbar.contact },
  ];

  const LanguageToggle = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.03)',
      borderRadius: '20px',
      padding: '2px',
      border: '1px solid var(--border-subtle)',
    }}>
      <button
        onClick={() => setLanguage('id')}
        style={{
          padding: '4px 10px',
          borderRadius: '18px',
          fontSize: '0.75rem',
          fontWeight: 700,
          border: 'none',
          background: language === 'id' ? 'linear-gradient(135deg, #d4af37, #996515)' : 'transparent',
          color: language === 'id' ? 'white' : 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '4px 10px',
          borderRadius: '18px',
          fontSize: '0.75rem',
          fontWeight: 700,
          border: 'none',
          background: language === 'en' ? 'linear-gradient(135deg, #d4af37, #996515)' : 'transparent',
          color: language === 'en' ? 'white' : 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? '0 4px 15px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d4af37, #f1c40f, #996515)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              color: 'white',
              fontWeight: 800,
              fontFamily: 'Space Grotesk, sans-serif',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
            }}>
              L
            </div>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--text-primary), #996515)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.5px',
            }}>
              LuxeVoyage
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          className="desktop-nav-links"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: pathname === link.href ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)';
                  e.currentTarget.style.background = pathname === link.href ? 'rgba(212, 175, 55, 0.08)' : 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Language */}
          <div className="desktop-nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <LanguageToggle />
            <Link href="/contact" className="btn-primary" style={{
              padding: '10px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d4af37, #f1c40f, #996515)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.2)';
            }}
            >
              {t.navbar.getStarted}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              padding: '8px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-nav-menu" style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'fadeIn 0.2s ease',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 18px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: pathname === link.href ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #d4af37, #996515)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            textAlign: 'center',
            marginTop: '8px',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
          }}>
            {t.navbar.getStarted} →
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav-links,
          .desktop-nav-cta {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
