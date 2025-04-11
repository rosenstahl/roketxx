import * as Sentry from "@sentry/react";

export const initErrorTracking = () => {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    Sentry.init({
      dsn: "https://7e527de544d3a77fdd362b1e5947e298@o4508779010457600.ingest.de.sentry.io/4508779021729872",
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay()
      ],
      enabled: import.meta.env.VITE_APP_ENV === 'production',
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
};

export const trackError = (error, context = {}) => {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context
    });
  } else {
    console.error('Error:', error, 'Context:', context);
  }
};