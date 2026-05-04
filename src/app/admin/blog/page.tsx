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
  FileText,
  Calendar,
  User,
  Clock,
  Tag
} from 'lucide-react';

const PostForm = ({ post, title, onSave, onClose }: { post?: any, title: string, onSave: (e: React.FormEvent) => void, onClose: () => void }) => (
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Judul</label>
            <input name="title" defaultValue={post?.title} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Kategori</label>
            <input name="category" defaultValue={post?.category} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Ringkasan (Excerpt)</label>
          <textarea name="excerpt" defaultValue={post?.excerpt} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '60px' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Isi Artikel Lengkap</label>
          <textarea name="content" defaultValue={post?.content} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '150px' }} placeholder="Tulis artikel lengkap di sini..." />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tanggal</label>
            <input name="date" type="date" defaultValue={post?.date || new Date().toISOString().split('T')[0]} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Waktu Baca (misal: 5 min read)</label>
            <input name="readTime" defaultValue={post?.readTime} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Penulis</label>
            <input name="author" defaultValue={post?.author} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>URL Gambar (Unsplash)</label>
            <input name="image" defaultValue={post?.image} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: '#d4af37', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Simpan Artikel
        </button>
      </form>
    </div>
  </div>
);

export default function AdminBlog() {
  const { content, updateBlogPosts, saveContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const posts = content.blog?.posts || [];

  const filteredPosts = posts.filter((post: any) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Hapus artikel ini?')) {
      const newPosts = posts.filter((p: any) => p.id !== id);
      updateBlogPosts(newPosts);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const postData = {
      id: editingPost?.id || Date.now(),
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      category: formData.get('category'),
      date: formData.get('date'),
      image: formData.get('image'),
      readTime: formData.get('readTime'),
      author: formData.get('author'),
    };

    let newPosts;
    if (isAdding) {
      newPosts = [postData, ...posts];
    } else {
      newPosts = posts.map((p: any) => p.id === editingPost.id ? postData : p);
    }

    updateBlogPosts(newPosts);
    setIsAdding(false);
    setEditingPost(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
          <input
            placeholder="Cari artikel..."
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
            Tambah Artikel
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredPosts.map((post: any) => (
          <div key={post.id} style={{
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ height: '180px', position: 'relative' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditingPost(post)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(post.id)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>
                {post.category}
              </div>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: '#1e293b' }}>{post.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.excerpt}
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={14} /> {post.author}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {post.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editingPost || isAdding) && (
        <PostForm 
          post={editingPost} 
          title={isAdding ? 'Tambah Artikel Baru' : 'Edit Artikel'} 
          onSave={handleSave}
          onClose={() => { setIsAdding(false); setEditingPost(null); }}
        />
      )}
    </div>
  );
}
