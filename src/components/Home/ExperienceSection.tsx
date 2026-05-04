'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';

export default function ExperienceSection() {
  const { t } = useLanguage();
  const { content } = useContent();

  const galleryData = content.gallery || {
    title: 'Curated World Destinations',
    subtitle: 'Handpicked locations that offer the perfect blend of natural beauty and human ingenuity.',
    list: []
  };

  const destinations = galleryData.list || [];

  return (
    <section id="destinations" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">
            {t.navbar.destinations}
          </span>
          <h2 className="section-title">
            {galleryData.title}
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {galleryData.subtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }} className="grid-3">
          {destinations.map((dest, i) => (
            <div key={dest.name} style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              height: '450px',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `fadeInUp 0.6s ease ${i * 0.15}s both`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
            className="dest-card"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.1)';
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            }}
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: 'transform 0.6s ease' 
                }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'white',
                  backdropFilter: 'blur(10px)',
                  color: '#996515',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  width: 'fit-content',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 2px 8px rgba(212, 175, 55, 0.1)'
                }}>
                  {dest.tag}
                </span>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginBottom: '4px'
                }}>
                  {dest.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {dest.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 992px) {
          .grid-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
