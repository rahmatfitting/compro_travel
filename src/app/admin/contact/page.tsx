'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, RotateCcw, MapPin, Phone, Mail, Globe } from 'lucide-react';

const InputField = ({ label, value, onChange, icon: Icon }: any) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
        <Icon size={18} />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 12px 12px 42px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          fontSize: '0.9rem',
        }}
      />
    </div>
  </div>
);

export default function AdminContact() {
  const { content, updateContent, saveContent, resetContent } = useContent();

  const contactData = content.contactInfo || {
    address: 'Jl. Kemewahan No. 123, Jakarta Selatan, Indonesia',
    email: 'info@luxevoyage.com',
    phone: '+62 812-3456-7890',
    whatsapp: '+62 812-3456-7890',
    maps: 'https://maps.google.com/...'
  };

  const handleUpdate = (key: string, value: string) => {
    updateContent('contactInfo' as any, key, value);
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Informasi Kontak</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Kelola detail kontak yang muncul di seluruh website</p>
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

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        maxWidth: '800px'
      }}>
        <InputField label="Alamat Kantor" value={contactData.address} onChange={(v: string) => handleUpdate('address', v)} icon={MapPin} />
        <InputField label="Email Resmi" value={contactData.email} onChange={(v: string) => handleUpdate('email', v)} icon={Mail} />
        <InputField label="Nomor Telepon" value={contactData.phone} onChange={(v: string) => handleUpdate('phone', v)} icon={Phone} />
        <InputField label="WhatsApp (dengan kode negara)" value={contactData.whatsapp} onChange={(v: string) => handleUpdate('whatsapp', v)} icon={Phone} />
        <InputField label="Link Google Maps" value={contactData.maps} onChange={(v: string) => handleUpdate('maps', v)} icon={Globe} />
      </div>
    </div>
  );
}
