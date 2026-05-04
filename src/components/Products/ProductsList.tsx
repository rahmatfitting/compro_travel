'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/context/ContentContext';

export default function ProductsList() {
  const { language } = useLanguage();
  const { content } = useContent();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const products = content.products?.list || [];

  return (
    <section style={{
      padding: '40px 0 120px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {products.map((product) => {
            const isExpanded = expandedId === product.id;
            return (
              <div
                key={product.id}
                style={{
                  borderRadius: '20px',
                  background: isExpanded ? (product.gradient || `linear-gradient(135deg, ${product.color}15, ${product.color}05)`) : 'rgba(20, 20, 32, 0.4)',
                  border: `1px solid ${isExpanded ? `${product.color}33` : 'rgba(255,255,255,0.04)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedId(isExpanded ? null : product.id)}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '28px 36px',
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: `${product.color}15`,
                    border: `1px solid ${product.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {product.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '2px',
                    }}>
                      {product.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: product.color,
                      fontWeight: 500,
                    }}>
                      {product.tagline}
                    </p>
                  </div>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Expandable Content */}
                <div style={{
                  maxHeight: isExpanded ? '400px' : '0',
                  opacity: isExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}>
                  <div style={{
                    padding: '0 36px 36px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '32px',
                  }}
                  className="product-detail-grid"
                  >
                    <div>
                      <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        marginBottom: '20px',
                      }}>
                        {product.description}
                      </p>
                      <button style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        border: 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: `0 4px 15px ${product.color}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        {language === 'id' ? 'Jelajahi Modul' : 'Explore Module'} →
                      </button>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                    }}>
                      {product.features.map((feature) => (
                        <div key={feature} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                        }}>
                          <span style={{ color: product.color, fontSize: '0.7rem' }}>✦</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
