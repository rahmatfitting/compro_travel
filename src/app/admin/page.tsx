'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Views', value: '12,840', icon: Eye, color: '#3b82f6', trend: '+12%' },
    { label: 'Active Users', value: '1,204', icon: Users, color: '#10b981', trend: '+5%' },
    { label: 'Bookings', value: '48', icon: ShoppingBag, color: '#8b5cf6', trend: '+18%' },
    { label: 'Revenue', value: '$42.5k', icon: TrendingUp, color: '#f59e0b', trend: '+24%' },
  ];

  const recentActivity = [
    { text: 'Hero title updated', time: '2 hours ago', icon: Clock },
    { text: 'New blog post published', time: '5 hours ago', icon: CheckCircle2 },
    { text: 'Contact info updated', time: 'Yesterday', icon: Clock },
    { text: 'Product price adjusted', time: '2 days ago', icon: CheckCircle2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Welcome Section */}
      <div style={{
        padding: '30px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px' }}>
            Selamat Datang, Admin! 👋
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '500px', lineHeight: 1.6 }}>
            Kelola konten website LuxeVoyage Anda dengan mudah. Ubah teks, tambahkan destinasi, 
            atau posting artikel terbaru langsung dari dashboard ini.
          </p>
        </div>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.1)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            padding: '24px',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${stat.color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
              }}>
                <stat.icon size={24} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#10b981',
                background: '#10b98110',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
      }}>
        {/* Quick Links */}
        <div style={{
          padding: '24px',
          background: 'white',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Akses Cepat</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {[
              { label: 'Edit Hero Home', href: '/admin/home', desc: 'Ubah teks utama halaman depan' },
              { label: 'Tulis Blog Baru', href: '/admin/blog', desc: 'Buat artikel perjalanan terbaru' },
              { label: 'Update Paket Tour', href: '/admin/products', desc: 'Kelola destinasi & harga' },
              { label: 'Info Kontak', href: '/admin/contact', desc: 'Ubah nomor WA & alamat' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{
                padding: '20px',
                borderRadius: '16px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>{link.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div style={{
          padding: '24px',
          background: 'white',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Aktivitas Terakhir</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {recentActivity.map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '15px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  flexShrink: 0,
                }}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1e293b' }}>{activity.text}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
