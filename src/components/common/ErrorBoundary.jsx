// src/components/common/ErrorBoundary.jsx
import React from 'react';
import { H2, BodyText } from '@/components/common/Typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In Produktion an Error-Tracking senden
    if (window.__APP_ENV__ === 'production') {
      console.error('Application Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <H2 className="mb-4">
              Oops, da ist etwas schiefgelaufen
            </H2>
            <BodyText className="mb-6">
              Bitte laden Sie die Seite neu oder kontaktieren Sie uns, wenn das Problem weiterhin besteht.
            </BodyText>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}