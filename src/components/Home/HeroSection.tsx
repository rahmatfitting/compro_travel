'use client';
// Refreshed HeroSection

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';
import { trackEvent } from '@/lib/analytics';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const { content } = useContent();

  const destinations = content.gallery?.list || [];
  const carouselImages = destinations.length > 0 ? destinations.map((d: any) => d.image) : [
    '/exp_santorini.png',
    '/exp_maldives.png',
    '/exp_swiss_alps.png',
  ];

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    setVisible(true);
    if (carouselImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
      background: 'var(--bg-primary)',
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/hero_luxury_travel.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent, var(--bg-primary) 90%)',
        zIndex: 1,
      }} />

      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(241, 196, 15, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '60px',
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="hero-grid"
        >
          {/* Left Side: Content */}
          <div style={{ maxWidth: '100%' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'white',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#d4af37',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '28px',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#d4af37',
                boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              {content.hero.badge}
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}>
              <span style={{ color: 'var(--text-primary)' }}>{content.hero.title1}</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #d4af37, #996515)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {content.hero.title2}
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '560px',
            }}>
              {content.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link 
                href="/contact" 
                className="btn-primary" 
                style={{ padding: '16px 36px', borderRadius: '14px', fontSize: '1rem' }}
                onClick={() => trackEvent('hero_cta_primary', { category: 'conversion' })}
              >
                {content.hero.ctaPrimary}
              </Link>

              <Link 
                href="/#destinations" 
                className="btn-secondary" 
                style={{ padding: '16px 36px', borderRadius: '14px', fontSize: '1rem' }}
                onClick={() => trackEvent('hero_cta_secondary', { category: 'engagement' })}
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>

            {/* Partner Brands */}
            <div style={{ marginTop: '60px' }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 600,
                marginBottom: '20px',
              }}>
                {content.hero.trusted}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                flexWrap: 'wrap',
                opacity: 0.6,
              }}>
                {['Emirates', 'Qatar Airways', 'Four Seasons', 'Ritz-Carlton', 'Aman'].map((brand) => (
                  <span key={brand} style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.5px',
                  }}>
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Featured Card with Carousel */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '32px',
              overflow: 'hidden',
              background: 'white',
              border: '1px solid var(--border-default)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                height: '400px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {carouselImages.map((img, idx) => (
                  <div
                    key={img}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: currentImg === idx ? 1 : 0,
                      transform: currentImg === idx ? 'scale(1)' : 'scale(1.1)',
                      transition: 'all 1.5s ease-in-out',
                    }}
                  />
                ))}
                
                {/* Overlay Badge */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  zIndex: 2,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}>
                  Featured: {destinations[currentImg]?.name || (currentImg === 0 ? 'Santorini' : currentImg === 1 ? 'Maldives' : 'Swiss Alps')}
                </div>

                {/* Progress Indicators */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 2,
                }}>
                  {carouselImages.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: currentImg === idx ? '32px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: currentImg === idx ? '#d4af37' : 'rgba(255,255,255,0.5)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {destinations[currentImg]?.name || 'The Aegean Dream'}
                  </h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#d4af37">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {destinations[currentImg] ? `Experience the beauty of ${destinations[currentImg].location} with our exclusive premium package.` : 'Enjoy exclusive access to a private caldera-view villa with a personal chef and sunset yacht tour.'}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                   <div style={{ flex: 1, padding: '12px', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
                     <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Package</p>
                     <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>7 Days / 6 Nights</p>
                   </div>
                   <div style={{ flex: 1, padding: '12px', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
                     <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Starting from</p>
                     <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#d4af37' }}>Premium Only</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
