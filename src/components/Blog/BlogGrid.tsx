'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';

export default function BlogGrid() {
  const { language } = useLanguage();
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');

  const blogPosts = content.blog?.posts || [];

  const categories = language === 'id' 
    ? ['Semua', 'Destinasi', 'Gaya Hidup', 'Layanan']
    : ['All', 'Destination', 'Lifestyle', 'Service'];

  return (
    <section style={{
      padding: '40px 0 120px',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '100px',
                background: (activeCategory === cat || (cat === 'All' && activeCategory === 'All') || (cat === 'Semua' && activeCategory === 'Semua'))
                  ? 'linear-gradient(135deg, #d4af37, #996515)'
                  : 'white',
                border: '1px solid var(--border-subtle)',
                color: (activeCategory === cat || (cat === 'All' && activeCategory === 'All') || (cat === 'Semua' && activeCategory === 'Semua'))
                  ? 'white'
                  : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: (activeCategory === cat) ? '0 4px 15px rgba(212, 175, 55, 0.2)' : '0 2px 8px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                  e.currentTarget.style.color = '#d4af37';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
        }}
        className="blog-grid"
        >
          {blogPosts.map((post: any) => (
            <article
              key={post.id}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'white',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
              className="blog-card"
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="card-image"
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(4px)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#996515',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}>
                  {post.category}
                </div>
              </div>

              <div style={{ padding: '32px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  marginBottom: '16px',
                  color: 'var(--text-primary)',
                  transition: 'color 0.3s ease',
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}>
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#d4af37',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}>
                  {language === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .blog-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.08);
        }
        .blog-card:hover .card-image {
          transform: scale(1.05);
        }
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
