'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { content, isLoading } = useContent();
  
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #d4af37', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style jsx>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const post = content.blog?.posts?.find((p: any) => String(p.id) === String(id));

  if (!post) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Artikel tidak ditemukan</h2>
          <Link href="/#blog" style={{ color: '#d4af37', fontWeight: 600 }}>Kembali ke Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}>
        {/* Hero Header */}
        <div style={{
          width: '100%',
          height: '60vh',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img 
            src={post.image} 
            alt={post.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '80px 24px'
          }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', color: 'white' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '6px 16px', 
                background: '#d4af37', 
                borderRadius: '8px', 
                fontSize: '0.8rem', 
                fontWeight: 700,
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {post.category}
              </div>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                fontWeight: 800, 
                lineHeight: 1.1,
                marginBottom: '30px',
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', fontSize: '0.95rem', opacity: 0.9 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  {post.author}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={20} color="#d4af37" /> {post.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} color="#d4af37" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '80px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '80px'
        }} className="content-grid">
          
          {/* Main Article */}
          <article>
            <Link href="/#blog" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              color: '#64748b', 
              textDecoration: 'none',
              marginBottom: '50px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color 0.3s ease'
            }} className="back-link">
              <ChevronLeft size={20} /> Kembali ke Jelajah Blog
            </Link>

            <div style={{ 
              fontSize: '1.25rem', 
              lineHeight: 1.9, 
              color: '#1e293b',
              whiteSpace: 'pre-wrap',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 400
            }}>
              {post.content || post.excerpt}
            </div>
            
            <div style={{ marginTop: '60px', padding: '40px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Bagikan Artikel</h3>
              <div style={{ display: 'flex', gap: '15px' }}>
                {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map(platform => (
                  <button key={platform} style={{ padding: '10px 20px', borderRadius: '10px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            <div style={{ 
              position: 'sticky', 
              top: '120px',
              padding: '40px',
              background: 'white',
              borderRadius: '32px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
            }}>
              <h4 style={{ fontWeight: 800, marginBottom: '25px', fontSize: '1.2rem', color: '#0f172a' }}>Tentang Penulis</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={36} color="#94a3b8" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{post.author}</div>
                  <div style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 700 }}>Expert Travel Curator</div>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.7, marginBottom: '30px' }}>
                Berdedikasi untuk menemukan permata tersembunyi di seluruh dunia dan membagikan pengalaman perjalanan paling eksklusif kepada Anda.
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', marginBottom: '30px' }} />
              <button style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '14px', 
                background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
                color: 'white', 
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(15, 23, 42, 0.1)'
              }}>
                Berlangganan Newsletter
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .back-link:hover {
          color: #d4af37 !important;
        }
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr !important;
            gap: 40px;
          }
          aside {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
