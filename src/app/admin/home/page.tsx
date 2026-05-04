'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, RotateCcw, Layout, BarChart3, Info } from 'lucide-react';

const InputField = ({ label, value, onChange, type = 'text', multiline = false }: any) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          fontSize: '0.9rem',
          minHeight: '100px',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          fontSize: '0.9rem',
        }}
      />
    )}
  </div>
);

export default function AdminHome() {
  const { content, updateContent, saveContent, resetContent } = useContent();

  const handleUpdate = (section: any, key: string, value: string) => {
    updateContent(section, key, value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Action Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        position: 'sticky',
        top: '90px',
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Edit Halaman Home</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Sesuaikan teks dan konten utama Beranda</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={resetContent}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#f1f5f9',
              border: 'none',
              color: '#64748b',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={saveContent}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d4af37, #996515)',
              border: 'none',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
            }}
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        {/* Hero Section */}
        <section style={{
          background: 'white',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <Layout size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Hero Section</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <InputField 
              label="Hero Badge" 
              value={content.hero.badge} 
              onChange={(val: string) => handleUpdate('hero', 'badge', val)} 
            />
            <InputField 
              label="Hero Title Part 1" 
              value={content.hero.title1} 
              onChange={(val: string) => handleUpdate('hero', 'title1', val)} 
            />
            <InputField 
              label="Hero Title Part 2" 
              value={content.hero.title2} 
              onChange={(val: string) => handleUpdate('hero', 'title2', val)} 
            />
            <InputField 
              label="Trusted Text" 
              value={content.hero.trusted} 
              onChange={(val: string) => handleUpdate('hero', 'trusted', val)} 
            />
          </div>
          <InputField 
            label="Hero Subtitle" 
            value={content.hero.subtitle} 
            onChange={(val: string) => handleUpdate('hero', 'subtitle', val)} 
            multiline 
          />
        </section>

        {/* Stats Section */}
        <section style={{
          background: 'white',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <BarChart3 size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Statistik</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <InputField 
              label="Label Destinasi" 
              value={content.stats.destinations} 
              onChange={(val: string) => handleUpdate('stats', 'destinations', val)} 
            />
            <InputField 
              label="Label Klien" 
              value={content.stats.clients} 
              onChange={(val: string) => handleUpdate('stats', 'clients', val)} 
            />
            <InputField 
              label="Label Pengalaman" 
              value={content.stats.experience} 
              onChange={(val: string) => handleUpdate('stats', 'experience', val)} 
            />
            <InputField 
              label="Label Support" 
              value={content.stats.support} 
              onChange={(val: string) => handleUpdate('stats', 'support', val)} 
            />
          </div>
        </section>

        {/* About Section */}
        <section style={{
          background: 'white',
          padding: '30px',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
              <Info size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>About Section</h3>
          </div>
          
          <InputField 
            label="About Title" 
            value={content.about.title} 
            onChange={(val: string) => handleUpdate('about', 'title', val)} 
          />
          <InputField 
            label="About Subtitle" 
            value={content.about.subtitle} 
            onChange={(val: string) => handleUpdate('about', 'subtitle', val)} 
            multiline
          />
          <InputField 
            label="Storytelling" 
            value={content.about.storytelling} 
            onChange={(val: string) => handleUpdate('about', 'storytelling', val)} 
            multiline
          />
        </section>
      </div>
    </div>
  );
}
