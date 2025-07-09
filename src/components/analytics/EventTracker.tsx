import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface EventTrackerProps {
  eventName: string;
  category: string;
  label?: string;
  value?: number;
  triggerOnMount?: boolean;
  triggerOnClick?: boolean;
  children: React.ReactNode;
}

const EventTracker: React.FC<EventTrackerProps> = ({
  eventName,
  category,
  label,
  value,
  triggerOnMount = false,
  triggerOnClick = false,
  children,
}) => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (triggerOnMount) {
      trackEvent(eventName, category, label, value);
    }
  }, [triggerOnMount, eventName, category, label, value, trackEvent]);

  const handleClick = () => {
    if (triggerOnClick) {
      trackEvent(eventName, category, label, value);
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};

export default EventTracker; 