'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';

export default function Footer() {
  const { language } = useLanguage();
  const { content } = useContent();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: content.footer.links.features, href: '/#services' },
      { label: content.footer.links.pricing, href: '/#services' },
      { label: content.footer.links.solutions, href: '/#destinations' },
      { label: 'Executive Concierge', href: '/#services' },
    ],
    company: [
      { label: content.footer.links.about, href: '/#about' },
      { label: 'Careers', href: '/' },
      { label: content.footer.links.contact, href: '/contact' },
    ],
    information: [
      { label: 'Terms & Conditions', href: '/' },
      { label: content.footer.links.help, href: '/' },
      { label: 'Privacy Policy', href: '/' },
    ],
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, white 100%)',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effects */}
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ padding: '80px 24px 40px' }}>
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '60px',
        }}
        className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
              }}>
                LuxeVoyage
              </span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: '320px',
              marginBottom: '24px',
            }}>
              {content.footer.tagline}
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                <a key={social} href="#" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'white',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.color = '#996515';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h4 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>{content.footer.product}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.services.map((link) => (
                <Link key={link.label} href={link.href} style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>{content.footer.company}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.company.map((link) => (
                <Link key={link.label} href={link.href} style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h4 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>{content.footer.resources}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.information.map((link) => (
                <Link key={link.label} href={link.href} style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent)',
          marginBottom: '32px',
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {currentYear} LuxeVoyage. {content.footer.rights}
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/admin" style={{ 
              color: '#d4af37', 
              fontSize: '0.8rem', 
              fontWeight: 700,
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              background: 'rgba(212, 175, 55, 0.05)'
            }}>CMS Admin</Link>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Terms</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
