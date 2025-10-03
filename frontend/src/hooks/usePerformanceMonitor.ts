import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    const reportMetrics = (metrics: PerformanceMetrics) => {
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          value: Math.round(metrics.LCP || 0),
          metric_name: 'LCP',
        });
      }

      // Send to backend
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      }).catch(console.error);
    };

    // Observe Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const metrics: PerformanceMetrics = {};

      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.LCP = entry.startTime;
        }
        if (entry.entryType === 'first-input') {
          metrics.FID = (entry as any).processingStart - entry.startTime;
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          metrics.CLS = (metrics.CLS || 0) + (entry as any).value;
        }
      });

      if (Object.keys(metrics).length > 0) {
        reportMetrics(metrics);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Measure TTFB
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        reportMetrics({ TTFB: navigation.responseStart - navigation.requestStart });
      }
    };

    if (document.readyState === 'complete') {
      measureTTFB();
    } else {
      window.addEventListener('load', measureTTFB);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('load', measureTTFB);
    };
  }, []);
};
