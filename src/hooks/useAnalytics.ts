import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pageview, event, gtmEvent } from '@/utils/analytics';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'DEV';



export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if(environment === 'PROD'){
          pageview(url);
          gtmEvent('page_view', {
            page_title: document.title,
            page_location: url,
          });
      }
    };

    const handleNavigation = () => {
      if(environment === 'PROD'){
        const url = window.location.href;
        handleRouteChange(url);
      }
    };

    if(environment === 'PROD'){
      window.addEventListener('popstate', handleNavigation);
      
      if (typeof window !== 'undefined') {
        handleRouteChange(window.location.href);
      }
    }

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // envía eventos generales de analytics
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    
    
    if(environment === 'PROD'){
      event({ action, category, label, value });
      gtmEvent('custom_event', { action, category, label, value });  
    }
                    
    
    
  };

  // envía Específicamente para conversiones de Google Ads
  const trackConversion = (conversionId: string, conversionLabel: string, value?: number) => {
    
    
    if (typeof window !== 'undefined' && window.gtag) {
        
      if(environment === 'PROD'){
        window.gtag('event', 'conversion', {
          send_to: `${conversionId}/${conversionLabel}`,
          value: value,
        });
      }
      
    }
  };

  return { trackEvent, trackConversion, gtmEvent };
}; 