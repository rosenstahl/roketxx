/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% - Basis
        base: {
          primary: '#EEEDEA',    // Warmer Hintergrund
          secondary: '#FFFFFF',   // Karten/Komponenten
          tertiary: '#F1F0EC',   // Abgedunkelte Version
        },
        // 30% - Hauptfarben
        main: {
          primary: '#171614',    // Wärmer, perfekter Kontrast
          secondary: '#1F1E1C',  // Überschriften
          tertiary: '#333333',   // Längere Texte
        },
        // 10% - Akzentfarben
        accent: {
          primary: '#007AFF',    // Gedämpftes Blau
          secondary: '#FF7043',  // Weniger gesättigtes Orange
          tertiary: '#00B27A',   // Gedämpftes Grün
        },
        // Unterstützungsfarben
        support: {
          gray: '#7A7A7A',       // Neutral für Nebentexte
          lightGray: '#E5E4E1',  // Harmonische Trennlinien
          overlay: 'rgba(0, 0, 0, 0.05)', // Sanfte Hover-Effekte
        }
      },
      fontFamily: {
        'sf': ['SF Pro Display', 'Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Überschriften
        'h1': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-mobile': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-mobile': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4-mobile': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],

        // Fließtext
        'lead': ['1.25rem', { lineHeight: '1.8', fontWeight: '400' }],
        'lead-mobile': ['1.125rem', { lineHeight: '1.8', fontWeight: '400' }],
        'base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],

        // UI Elements
        'button': ['1rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'nav': ['1rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        'label': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],

        // Special Text Styles
        'quote': ['1.25rem', { lineHeight: '1.8', fontWeight: '600', fontStyle: 'italic' }],
        'price': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'alert': ['0.875rem', { lineHeight: '1.6', fontWeight: '500' }],
      },
      spacing: {
        'list-gap': '0.75rem', // 12px zwischen Listen-Items
      },
      letterSpacing: {
        'ui': '0.01em',
      },
    },
  },
  plugins: [],
}