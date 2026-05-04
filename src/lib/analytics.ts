export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  // 1. External Tracking (GA)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  
  // 2. Clarity event tracking
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', 'event', eventName);
  }

  // 3. Internal Tracking (Database)
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        label: params.label || '',
        category: params.category || '',
        pathname: window.location.pathname,
      }),
    }).catch(err => console.error('Internal analytics error:', err));
  }
};
