// Google Analytics and custom analytics utilities

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: url,
    });
  }

  // Send to custom analytics
  fetch('/api/analytics/pageview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: url,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    }),
  }).catch(console.error);
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Send to custom analytics
  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, action, label, value }),
  }).catch(console.error);
};

// Track user timing
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      event_category: category,
      name: variable,
      value: Math.round(value),
      event_label: label,
    });
  }
};

// Track exceptions
export const trackException = (description: string, fatal = false) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description,
      fatal,
    });
  }
};

// Track social interactions
export const trackSocial = (
  network: string,
  action: string,
  target: string
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'social', {
      social_network: network,
      social_action: action,
      social_target: target,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url: string, target = '_blank') => {
  trackEvent('Outbound Link', 'click', url);
  
  if (target === '_blank') {
    window.open(url, target);
  } else {
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  }
};

// Session tracking
class SessionTracker {
  private startTime: number;
  private pageViews: number = 0;
  private events: Array<{ timestamp: number; type: string; data: any }> = [];

  constructor() {
    this.startTime = Date.now();
    this.trackSession();
  }

  private trackSession() {
    // Track session start
    trackEvent('Session', 'start', window.location.pathname);

    // Track session end
    window.addEventListener('beforeunload', () => {
      const duration = Date.now() - this.startTime;
      trackTiming('Session', 'duration', duration);
      trackEvent('Session', 'end', window.location.pathname, this.pageViews);
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEvent('Session', 'background');
      } else {
        trackEvent('Session', 'foreground');
      }
    });
  }

  incrementPageViews() {
    this.pageViews++;
  }

  addEvent(type: string, data: any) {
    this.events.push({ timestamp: Date.now(), type, data });
  }

  getSessionData() {
    return {
      duration: Date.now() - this.startTime,
      pageViews: this.pageViews,
      events: this.events,
    };
  }
}

export const sessionTracker = new SessionTracker();

// User engagement tracking
export const trackEngagement = () => {
  let engagementTime = 0;
  let lastActiveTime = Date.now();
  let isActive = true;

  const updateEngagement = () => {
    if (isActive) {
      engagementTime += Date.now() - lastActiveTime;
    }
    lastActiveTime = Date.now();
  };

  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, () => {
      if (!isActive) {
        isActive = true;
        lastActiveTime = Date.now();
        trackEvent('Engagement', 'active');
      }
    });
  });

  // Check for inactivity
  setInterval(() => {
    if (isActive && Date.now() - lastActiveTime > 30000) { // 30 seconds
      isActive = false;
      updateEngagement();
      trackEvent('Engagement', 'inactive');
    }
  }, 5000);

  // Send engagement time on unload
  window.addEventListener('beforeunload', () => {
    updateEngagement();
    trackTiming('Engagement', 'time', engagementTime);
  });
};

// Scroll depth tracking
export const trackScrollDepth = () => {
  const depths = [25, 50, 75, 100];
  const reached = new Set<number>();

  const checkScrollDepth = () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / height) * 100;

    depths.forEach(depth => {
      if (scrollPercent >= depth && !reached.has(depth)) {
        reached.add(depth);
        trackEvent('Scroll Depth', 'reached', `${depth}%`, depth);
      }
    });
  };

  window.addEventListener('scroll', checkScrollDepth, { passive: true });
};
