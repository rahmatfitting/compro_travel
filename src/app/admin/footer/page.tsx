'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, LayoutPanelTop, Link as LinkIcon, Type } from 'lucide-react';

export default function AdminFooter() {
  const { content, updateContent, saveContent } = useContent();

  const handleUpdate = (key: string, value: string) => {
    updateContent('footer', key, value);
  };

  const handleLinkUpdate = (key: string, value: string) => {
    updateContent('footer', 'links', {
      ...content.footer.links,
      [key]: value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pengaturan Footer</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Sesuaikan teks dan tautan di bagian bawah website</p>
        </div>
        <button
          onClick={saveContent}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: '10px',
            background: '#d4af37',
            color: 'white',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Save size={18} />
          Simpan
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* General Info */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <Type size={20} color="#64748b" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Informasi Umum</h3>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
              Tagline Footer
            </label>
            <textarea
              value={content.footer.tagline}
              onChange={(e) => handleUpdate('tagline', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                minHeight: '100px',
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
              Rights Text
            </label>
            <input
              value={content.footer.rights}
              onChange={(e) => handleUpdate('rights', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem',
              }}
            />
          </div>
        </div>

        {/* Links Labels */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <LinkIcon size={20} color="#64748b" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Label Tautan</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Produk</label>
              <input value={content.footer.links.features} onChange={(e) => handleLinkUpdate('features', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Tentang Kami</label>
              <input value={content.footer.links.about} onChange={(e) => handleLinkUpdate('about', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Kontak</label>
              <input value={content.footer.links.contact} onChange={(e) => handleLinkUpdate('contact', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Pusat Bantuan</label>
              <input value={content.footer.links.help} onChange={(e) => handleLinkUpdate('help', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
