'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'planning',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: '📧',
      title: language === 'id' ? 'Email Kami' : 'Email Us',
      detail: 'concierge@luxevoyage.com',
      subDetail: language === 'id' ? 'Kami membalas dalam 24 jam' : 'We reply within 24 hours',
      color: '#d4af37',
    },
    {
      icon: '📞',
      title: language === 'id' ? 'Hubungi Kami' : 'Call Us',
      detail: '+62 21 555-8888',
      subDetail: '24/7 Premium Support',
      color: '#996515',
    },
    {
      icon: '📍',
      title: language === 'id' ? 'Kunjungi Kami' : 'Visit Us',
      detail: 'LuxeVoyage Plaza, Level 45',
      subDetail: 'Jakarta, Indonesia 10220',
      color: '#d4af37',
    },
    {
      icon: '💬',
      title: language === 'id' ? 'Chat Langsung' : 'Live Chat',
      detail: language === 'id' ? 'Tersedia 24/7' : 'Available 24/7',
      subDetail: language === 'id' ? 'Respon rata-rata: 2 mnt' : 'Average response: 2 min',
      color: '#996515',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackEvent('contact_form_submit', { 
      category: 'conversion', 
      subject: formData.subject 
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    background: 'white',
    border: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600 as const,
    color: 'var(--text-secondary)',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  };

  return (
    <section style={{
      padding: '40px 0 120px',
      position: 'relative',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '48px',
          alignItems: 'start',
        }}
        className="contact-grid"
        >
          {/* Left: Contact Info */}
          <div>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              {language === 'id' ? 'Informasi Kontak' : 'Contact Information'}
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '36px',
            }}>
              {language === 'id' 
                ? 'Hubungi spesialis kami melalui saluran apa pun. Kami siap membantu mewujudkan perjalanan impian Anda dengan layanan kelas dunia.'
                : 'Reach out to our specialists through any channel. We are ready to make your dream journey a reality with world-class service.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'white',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${info.color}12`,
                    border: `1px solid ${info.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.8rem',
                      color: info.color,
                      fontWeight: 600,
                      marginBottom: '2px',
                    }}>
                      {info.title}
                    </p>
                    <p style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}>
                      {info.detail}
                    </p>
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                    }}>
                      {info.subDetail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              marginTop: '32px',
              height: '200px',
              borderRadius: '16px',
              background: 'white',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}>
              {/* Grid pattern for map */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }} />
              <div style={{
                position: 'relative',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  margin: '0 auto 12px',
                  animation: 'pulse-glow 2s ease infinite',
                }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            padding: '40px',
            borderRadius: '24px',
            background: 'white',
            border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          }}>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '1.5rem',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#996515',
                  marginBottom: '8px',
                }}>
                  {language === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                }}>
                  {language === 'id' 
                    ? 'Terima kasih telah menghubungi kami. Spesialis kami akan menghubungi Anda dalam waktu 24 jam.'
                    : "Thank you for reaching out. Our specialist will get back to you within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '28px',
                }}>
                  {language === 'id' ? 'Konsultasi Perjalanan' : 'Travel Consultation'}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px',
                }}
                className="form-grid"
                >
                  <div>
                    <label style={labelStyle}>{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      placeholder="john@luxury.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{language === 'id' ? 'Tipe Perjalanan' : 'Travel Type'}</label>
                    <input
                      type="text"
                      placeholder="Leisure, Business, etc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{language === 'id' ? 'Telepon' : 'Phone'}</label>
                    <input
                      type="tel"
                      placeholder="+62 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{language === 'id' ? 'Tujuan' : 'Objective'}</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%236b6b80' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value="planning">{language === 'id' ? 'Perencanaan Perjalanan' : 'Trip Planning'}</option>
                    <option value="quote">{language === 'id' ? 'Minta Penawaran' : 'Request a Quote'}</option>
                    <option value="partnership">{language === 'id' ? 'Kemitraan' : 'Partnership'}</option>
                    <option value="other">{language === 'id' ? 'Lainnya' : 'Other'}</option>
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>{language === 'id' ? 'Pesan' : 'Message'}</label>
                  <textarea
                    placeholder={language === 'id' ? 'Beri tahu kami tentang destinasi impian Anda...' : 'Tell us about your dream destination...'}
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px 32px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #d4af37, #f1c40f, #996515)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
                  }}
                >
                  {language === 'id' ? 'Kirim Pesan' : 'Send Message'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <p style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '16px',
                }}>
                  {language === 'id' 
                    ? 'Dengan mengirimkan, Anda menyetujui Kebijakan Privasi dan Ketentuan Layanan kami.'
                    : 'By submitting, you agree to our Privacy Policy and Terms of Service.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
