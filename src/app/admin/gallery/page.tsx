'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon,
  MapPin,
  Tag,
  Type
} from 'lucide-react';

const DestinationForm = ({ destination, title, onSave, onClose }: { destination?: any, title: string, onSave: (e: React.FormEvent) => void, onClose: () => void }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  }}>
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>
      <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nama Destinasi</label>
          <div style={{ position: 'relative' }}>
            <Type style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <input name="name" defaultValue={destination?.name} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="misal: Swiss Alps" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Lokasi / Negara</label>
          <div style={{ position: 'relative' }}>
            <MapPin style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <input name="location" defaultValue={destination?.location} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="misal: Switzerland" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tag (Label)</label>
          <div style={{ position: 'relative' }}>
            <Tag style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <input name="tag" defaultValue={destination?.tag} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="misal: Adventure, Relaxation, Romantic" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>URL Gambar</label>
          <div style={{ position: 'relative' }}>
            <ImageIcon style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <input name="image" defaultValue={destination?.image} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="/exp_swiss_alps.png atau URL Unsplash" />
          </div>
        </div>
        
        {destination?.image && (
          <div style={{ marginTop: '10px', borderRadius: '12px', overflow: 'hidden', height: '150px' }}>
            <img src={destination.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: '#d4af37', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Simpan Destinasi
        </button>
      </form>
    </div>
  </div>
);

export default function AdminGallery() {
  const { content, updateGallery, saveContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDest, setEditingDest] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const destinations = content.gallery?.list || [];

  const filteredDestinations = destinations.filter((dest: any) => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Hapus destinasi ini dari galeri?')) {
      const newDests = destinations.filter((d: any) => d.id !== id);
      updateGallery(newDests);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const destData = {
      id: editingDest?.id || Date.now().toString(),
      name: formData.get('name'),
      location: formData.get('location'),
      tag: formData.get('tag'),
      image: formData.get('image'),
    };

    let newDests;
    if (isAdding) {
      newDests = [...destinations, destData];
    } else {
      newDests = destinations.map((d: any) => d.id === editingDest.id ? destData : d);
    }

    updateGallery(newDests);
    setIsAdding(false);
    setEditingDest(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
          <input
            placeholder="Cari destinasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#0f172a',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Plus size={18} />
            Tambah Destinasi
          </button>
          <button
            onClick={saveContent}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#d4af37',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filteredDestinations.map((dest: any) => (
          <div key={dest.id} style={{
            background: 'white',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ height: '200px', position: 'relative' }}>
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditingDest(dest)} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(dest.id)} style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', padding: '4px 12px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '100px', color: '#996515', fontSize: '0.7rem', fontWeight: 700, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                {dest.tag}
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', color: '#1e293b' }}>{dest.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#64748b' }}>
                <MapPin size={14} />
                {dest.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editingDest || isAdding) && (
        <DestinationForm 
          destination={editingDest} 
          title={isAdding ? 'Tambah Destinasi Baru' : 'Edit Destinasi'} 
          onSave={handleSave}
          onClose={() => { setIsAdding(false); setEditingDest(null); }}
        />
      )}
    </div>
  );
}
