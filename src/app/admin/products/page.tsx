'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Package,
  Type,
  AlignLeft,
  Star,
  CheckCircle2
} from 'lucide-react';

const ProductForm = ({ product, title, onSave, onClose }: { product?: any, title: string, onSave: (e: React.FormEvent) => void, onClose: () => void }) => (
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
      maxWidth: '600px',
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
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nama Layanan / Produk</label>
          <input name="title" defaultValue={product?.title} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tagline</label>
          <input name="tagline" defaultValue={product?.tagline} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Deskripsi</label>
          <textarea name="description" defaultValue={product?.description} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '80px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Icon (Emoji)</label>
            <input name="icon" defaultValue={product?.icon} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Warna (Hex)</label>
            <input name="color" defaultValue={product?.color || '#d4af37'} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Fitur Utama (Pisahkan dengan koma)</label>
          <textarea name="features" defaultValue={product?.features?.join(', ')} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '60px' }} placeholder="Fitur 1, Fitur 2, Fitur 3" />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: '#d4af37', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Simpan Layanan
        </button>
      </form>
    </div>
  </div>
);

export default function AdminProducts() {
  const { content, updateProducts, saveContent } = useContent();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const products = content.products?.list || [];

  const handleDelete = (id: string) => {
    if (confirm('Hapus produk/layanan ini?')) {
      const newProducts = products.filter((p: any) => p.id !== id);
      updateProducts(newProducts);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const features = (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f !== '');
    
    const productData = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      title: formData.get('title'),
      tagline: formData.get('tagline'),
      description: formData.get('description'),
      icon: formData.get('icon'),
      color: formData.get('color'),
      features: features,
    };

    let newProducts;
    if (isAdding) {
      newProducts = [...products, productData];
    } else {
      newProducts = products.map((p: any) => p.id === editingProduct.id ? productData : p);
    }

    updateProducts(newProducts);
    setIsAdding(false);
    setEditingProduct(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Kelola Layanan & Produk</h2>
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
            Tambah Layanan
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {products.map((product: any) => (
          <div key={product.id} style={{
            background: 'white',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            padding: '30px',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
              <button onClick={() => setEditingProduct(product)} style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', cursor: 'pointer' }}>
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(product.id)} style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f8fafc', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
            </div>

            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: `${product.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              marginBottom: '20px',
            }}>
              {product.icon}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>{product.title}</h3>
            <p style={{ fontSize: '0.85rem', color: product.color, fontWeight: 600, marginBottom: '15px' }}>{product.tagline}</p>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>{product.description}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.features?.map((f: string, i: number) => (
                <div key={i} style={{ 
                  fontSize: '0.75rem', 
                  padding: '4px 10px', 
                  borderRadius: '100px', 
                  background: '#f1f5f9', 
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={12} color={product.color} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(editingProduct || isAdding) && (
        <ProductForm 
          product={editingProduct} 
          title={isAdding ? 'Tambah Layanan Baru' : 'Edit Layanan'} 
          onSave={handleSave}
          onClose={() => { setIsAdding(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}
