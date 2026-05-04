'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { trackEvent } from '@/lib/analytics';

type Message = {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

export default function ChatWidget() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when context is ready
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        text: t.chat.welcome, 
        sender: 'bot', 
        timestamp: new Date() 
      }]);
    }
  }, [t.chat.welcome, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen) trackEvent('chat_open', { category: 'engagement' });
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    trackEvent('chat_message_sent', { category: 'engagement', label: inputValue });

    // Mock Bot Response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        text: language === 'id' ? 'Terima kasih atas pesan Anda! Tim kami telah diberitahu dan akan segera menghubungi Anda.' : 'Thank you for your message! Our team has been notified and will get back to you shortly.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const handleOptionClick = (label: string) => {
    const userMsg: Message = {
      text: label,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    trackEvent('chat_option_click', { category: 'engagement', label: label });

    setTimeout(() => {
      setIsTyping(false);
      let response = "I'll connect you with a specialist right away.";
      if (label.includes('Demo')) response = "I'd love to help you with a demo! When are you free?";
      if (label.includes('Pricing')) response = "Our pricing plans are flexible. Let me send you our latest catalog.";
      
      const botMsg: Message = {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Notification Bubble */}
      {showNotification && !isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '220px',
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px 15px 0 15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          fontSize: '0.85rem',
          color: '#1a1a25',
          fontWeight: 500,
          animation: 'fadeInUp 0.5s ease both',
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse-glow 2s infinite',
            }} />
            <span>Hey! Need help?</span>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#1a1a25',
              color: 'white',
              border: 'none',
              fontSize: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '380px',
          height: '560px',
          background: 'rgba(20, 20, 32, 0.85)',
          backdropFilter: 'blur(30px)',
          borderRadius: '28px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            background: 'var(--gradient-primary)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                LuxeVoyage Support
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Online</span>
              </div>
            </div>
            <button onClick={toggleChat} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            scrollBehavior: 'smooth',
          }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                }}
              >
                <div style={{
                  background: msg.sender === 'bot' ? 'rgba(255,255,255,0.06)' : 'var(--gradient-primary)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'bot' ? '0 18px 18px 18px' : '18px 18px 0 18px',
                  fontSize: '0.9rem',
                  color: 'white',
                  lineHeight: 1.5,
                  border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '0 18px 18px 18px', display: 'flex', gap: '4px' }}>
                <div className="typing-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                <div className="typing-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                <div className="typing-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {messages.length < 3 && (
            <div style={{ padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                t.chat.options.demo,
                t.chat.options.pricing,
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form 
            onSubmit={handleSendMessage}
            style={{ 
              padding: '20px 24px', 
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.chat.placeholder}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#d4af37'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: inputValue.trim() ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: 'white',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'rotate(90deg) scale(0.9)' : 'rotate(0) scale(1)',
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .typing-dot {
          animation: typing-blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
