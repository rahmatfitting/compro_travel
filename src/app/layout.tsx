import type { Metadata } from 'next';
import './globals.css';
import ChatWidget from '@/components/Chat/ChatWidget';
import { LanguageProvider } from '@/context/LanguageContext';
import { ContentProvider } from '@/context/ContentContext';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LuxeVoyage - Elite Travel & Curated Experiences',
  description: 'Bespoke travel experiences meticulously designed for your comfort and personal joy. From private jets to hidden villas, we make your dreams a reality.',
  keywords: 'luxury travel, elite destinations, private jet, luxury villa, curated experiences, world tours',
  openGraph: {
    title: 'LuxeVoyage - Absolute Luxury Travel',
    description: 'Explore the world with absolute luxury and curated experiences.',
    type: 'website',
  },
};

import AnalyticsTracker from '@/components/Analytics/AnalyticsTracker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <AnalyticsTracker />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || ''}");
          `}
        </Script>
      </head>
      <body>
        <LanguageProvider>
          <ContentProvider>
            {children}
            <ChatWidget />
          </ContentProvider>
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
