// src/utils/performance.js
export const reportWebVitals = () => {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    // Basis Performance API
    try {
      if (window.performance && window.performance.mark) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (window.gtag) {
              window.gtag('event', entry.name, {
                value: Math.round(entry.startTime),
                event_category: 'Performance',
                non_interaction: true,
              });
            }
          });
        });

        observer.observe({ entryTypes: ['paint', 'navigation'] });
      }
    } catch (error) {
      console.error('Performance reporting error:', error);
    }
  }
};

export const measurePerformance = () => {
  if (window.performance && window.performance.mark) {
    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      const metrics = {
        TTFB: navigation.responseStart - navigation.requestStart,
        Load: navigation.loadEventEnd - navigation.startTime
      };

      if (import.meta.env.DEV) {
        console.info('Performance Metrics:', metrics);
      }
    } catch (error) {
      console.error('Performance measurement error:', error);
    }
  }
};