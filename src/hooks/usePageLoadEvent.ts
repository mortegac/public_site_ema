import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

interface UsePageLoadEventProps {
  eventName: string;
  ipAddress?: string;
}

export const usePageLoadEvent = ({ eventName, ipAddress }: UsePageLoadEventProps) => {
  const { gtmEvent } = useAnalytics();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const fecha = new Date().toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    gtmEvent(eventName, {
      fecha,
      ip: ipAddress || 'unknown'
    });

    hasTracked.current = true;
  }, [eventName, ipAddress, gtmEvent]);
}; 