import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pageview, event, gtmEvent } from '@/utils/analytics';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
      gtmEvent('page_view', {
        page_title: document.title,
        page_location: url,
      });
    };

    const handleNavigation = () => {
      const url = window.location.href;
      handleRouteChange(url);
    };

    window.addEventListener('popstate', handleNavigation);
    
    if (typeof window !== 'undefined') {
      handleRouteChange(window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // envía eventos generales de analytics
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    event({ action, category, label, value });
    gtmEvent('custom_event', { action, category, label, value });
  };

  // envía Específicamente para conversiones de Google Ads
  const trackConversion = (conversionId: string, conversionLabel: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
        value: value,
      });
    }
  };

  return { trackEvent, trackConversion, gtmEvent };
}; 