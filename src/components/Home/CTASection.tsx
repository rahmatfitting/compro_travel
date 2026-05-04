'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export default function CTASection() {
  const { t, language } = useLanguage();

  return (
    <section style={{
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          position: 'relative',
          padding: '80px 60px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(241, 196, 15, 0.05))',
          border: '1px solid var(--border-accent)',
          textAlign: 'center',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
        }}>
          {/* Background patterns */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(241, 196, 15, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            borderRadius: '28px',
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '16px',
              color: 'var(--text-primary)',
            }}>
              {t.cta.title.split('Cerita Baru')[0]}
              <span style={{
                background: 'linear-gradient(135deg, #d4af37, #f1c40f, #996515)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {language === 'id' ? 'Cerita Baru?' : 'New Story?'}
              </span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}>
              {t.cta.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #d4af37, #f1c40f, #996515)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
              }}
              onClick={() => trackEvent('cta_section_click', { category: 'conversion' })}
              >
                {t.cta.button}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: '24px',
            }}>
              {t.cta.noCredit}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
