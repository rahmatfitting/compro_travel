'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Package, 
  Mail, 
  Settings, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/check-session');
        if (!res.ok) {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Home Content', icon: Home, href: '/admin/home' },
    { name: 'Destinations', icon: ImageIcon, href: '/admin/gallery' },
    { name: 'Blog', icon: FileText, href: '/admin/blog' },
    { name: 'Analytics', icon: LayoutDashboard, href: '/admin/analytics' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Contact', icon: Mail, href: '/admin/contact' },
    { name: 'Footer', icon: Settings, href: '/admin/footer' },
  ];

  const SidebarItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          margin: '4px 12px',
          borderRadius: '12px',
          color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
          background: isActive ? 'linear-gradient(135deg, #d4af37, #996515)' : 'transparent',
          transition: 'all 0.2s ease',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: isActive ? 600 : 400,
        }}
        onClick={() => setMobileOpen(false)}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'white';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }
        }}
      >
        <Icon size={20} />
        {(!collapsed || mobileOpen) && <span>{item.name}</span>}
      </Link>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: mobileOpen ? '280px' : (collapsed ? '80px' : '260px'),
        background: '#0f172a',
        display: mobileOpen ? 'flex' : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 'none' : 'flex'),
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        position: mobileOpen ? 'fixed' : 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #d4af37, #996515)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1rem',
          }}>
            L
          </div>
          {(!collapsed || mobileOpen) && (
            <span style={{ 
              color: 'white', 
              fontWeight: 700, 
              fontSize: '1.1rem',
              letterSpacing: '0.5px'
            }}>
              LuxeCMS
            </span>
          )}
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, paddingTop: '20px' }}>
          {menuItems.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}>
            <ExternalLink size={18} />
            {(!collapsed || mobileOpen) && <span>Live Site</span>}
          </Link>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0,
      }}>
        {/* Header */}
        <header style={{
          height: '70px',
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          position: 'sticky',
          top: 0,
          zIndex: 900,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
              {menuItems.find(m => m.href === pathname)?.name || 'Admin'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Administrator</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>admin@luxevoyage.com</div>
            </div>
            <button 
              onClick={handleLogout}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fee2e2';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <style jsx global>{`
        @media (max-width: 1024px) {
          .mobile-toggle {
            display: block !important;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        aside::-webkit-scrollbar {
          width: 4px;
        }
        aside::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        aside::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          borderRadius: 10px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
