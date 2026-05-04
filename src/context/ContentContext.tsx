'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationType } from '@/constants/translations';
import { useLanguage } from './LanguageContext';

interface ContentContextType {
  content: TranslationType;
  updateContent: (section: keyof TranslationType, key: string, value: any) => void;
  updateBlogPosts: (posts: any[]) => void;
  updateProducts: (products: any[]) => void;
  updateGallery: (items: any[]) => void;
  saveContent: () => Promise<void>;
  resetContent: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [content, setContent] = useState<TranslationType>(translations[language]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/content?lang=${language}`);
        const data = await response.json();
        if (data && !data.error) {
          setContent(data);
        } else {
          setContent(translations[language]);
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setContent(translations[language]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  const updateContent = (section: keyof TranslationType, key: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }));
  };

  const updateBlogPosts = (posts: any[]) => {
    setContent(prev => ({
      ...prev,
      blog: {
        ...(prev.blog as any || {}),
        posts: posts
      }
    }));
  };

  const updateProducts = (products: any[]) => {
    setContent(prev => ({
      ...prev,
      products: {
        ...(prev.products as any || {}),
        list: products
      }
    }));
  };

  const updateGallery = (items: any[]) => {
    setContent(prev => ({
      ...prev,
      gallery: {
        ...(prev.gallery as any || {}),
        list: items
      }
    }));
  };

  const saveContent = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: language,
          data: content
        }),
      });

      if (response.ok) {
        alert('Konten berhasil disimpan ke MySQL!');
      } else {
        alert('Gagal menyimpan konten ke MySQL.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Terjadi kesalahan saat menyimpan ke database.');
    }
  };

  const resetContent = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua konten ke pengaturan awal? Perubahan di MySQL akan hilang setelah Anda menekan Simpan lagi.')) {
      setContent(translations[language]);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateBlogPosts, updateProducts, updateGallery, saveContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
