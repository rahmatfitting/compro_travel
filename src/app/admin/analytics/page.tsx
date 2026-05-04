'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  MousePointer2, 
  Clock, 
  ArrowUpRight, 
  ExternalLink,
  Info,
  TrendingUp,
  Smartphone,
  Monitor,
  MessageSquare,
  Loader2,
  RefreshCcw
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color, isNegative }: any) => (
  <div style={{
    background: 'white',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: `${color}10`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon size={22} />
      </div>
      {change !== undefined && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: isNegative ? '#ef4444' : '#10b981',
          fontSize: '0.8rem',
          fontWeight: 600,
          background: isNegative ? '#ef444410' : '#10b98110',
          padding: '4px 8px',
          borderRadius: '100px',
        }}>
          <ArrowUpRight size={14} style={{ transform: isNegative ? 'rotate(90deg)' : 'none' }} />
          {change}%
        </div>
      )}
    </div>
    <div>
      <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{title}</p>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginTop: '4px' }}>{value}</h3>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={40} color="#d4af37" />
      </div>
    );
  }

  const visitChange = data?.visitsPrev24h > 0 
    ? Math.round(((data.visitsLast24h - data.visitsPrev24h) / data.visitsPrev24h) * 100)
    : 100;

  const mobileCount = data?.deviceStats?.find((d: any) => d.device === 'Mobile')?._count?.device || 0;
  const desktopCount = data?.deviceStats?.find((d: any) => d.device === 'Desktop')?._count?.device || 0;
  const totalDevice = mobileCount + desktopCount || 1;
  const mobilePercent = Math.round((mobileCount / totalDevice) * 100);
  const desktopPercent = 100 - mobilePercent;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header with Info */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        padding: '32px',
        borderRadius: '28px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Ringkasan Analisa Pengunjung (Live)</h2>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
            Data di bawah ini diambil secara real-time dari database internal Anda.
          </p>
        </div>
        <button 
          onClick={fetchData}
          style={{
            position: 'relative',
            zIndex: 10,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem'
          }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
          Refresh Data
        </button>
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <StatCard 
          title="Total Hits" 
          value={data?.totalVisits?.toLocaleString() || '0'} 
          change={visitChange} 
          isNegative={visitChange < 0}
          icon={Users} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Hits 24 Jam Terakhir" 
          value={data?.visitsLast24h || '0'} 
          icon={TrendingUp} 
          color="#10b981" 
        />
        <StatCard 
          title="Events Terdaftar" 
          value={data?.eventStats?.reduce((acc: number, curr: any) => acc + curr._count.event, 0) || '0'} 
          icon={MessageSquare} 
          color="#8b5cf6" 
        />
        <StatCard 
          title="Unique Devices" 
          value={data?.deviceStats?.length || '0'} 
          icon={Smartphone} 
          color="#f59e0b" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }} className="analytics-grid">
        {/* Behavior & Event Tracking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '28px',
            border: '1px solid #e2e8f0',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={20} color="#d4af37" /> Top 5 Aktivitas User
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data?.eventStats?.length > 0 ? data.eventStats.map((event: any, idx: number) => {
                const colors = ['#10b981', '#3b82f6', '#d4af37', '#6366f1', '#f59e0b'];
                const max = data.eventStats[0]._count.event;
                const percent = Math.round((event._count.event / max) * 100);
                
                return (
                  <div key={event.event}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{event.event}</span>
                      <span style={{ color: '#64748b' }}>{event._count.event} hits</span>
                    </div>
                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: colors[idx % colors.length], borderRadius: '100px' }} />
                    </div>
                  </div>
                );
              }) : (
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', padding: '20px' }}>Belum ada data event tersimpan.</p>
              )}
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '28px',
            border: '1px solid #e2e8f0',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Device Distribution</h3>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Mobile</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{mobilePercent}%</p>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Monitor size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Desktop</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{desktopPercent}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: '#fff',
            padding: '30px',
            borderRadius: '28px',
            border: '1px solid #e2e8f0',
            height: '100%'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px' }}>Alat Analisa Lanjutan</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
              Data internal fokus pada interaksi tombol. Untuk analisa mendalam, gunakan alat eksternal berikut.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="https://analytics.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                }}
              >
                Google Analytics
                <ExternalLink size={16} color="#3b82f6" />
              </a>

              <a 
                href="https://clarity.microsoft.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: '#1e293b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                }}
              >
                Microsoft Clarity
                <ExternalLink size={16} color="#10b981" />
              </a>
            </div>

            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#f0f9ff',
              borderRadius: '20px',
              border: '1px solid #bae6fd',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <Info size={16} color="#0369a1" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1' }}>Informasi Data</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#0369a1', lineHeight: 1.5 }}>
                Data internal Anda merekam setiap interaksi unik di website ini. Pastikan untuk membandingkan data ini dengan Google Analytics untuk validasi trafik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
