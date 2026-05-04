'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view', { category: 'engagement', label: pathname });
  }, [pathname]);

  return null;
}
