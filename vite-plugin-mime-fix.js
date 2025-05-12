// vite-plugin-mime-fix.js
// Ein benutzerdefiniertes Vite-Plugin, um MIME-Typ-Probleme zu beheben

export default function mimeFix() {
  return {
    name: 'vite-plugin-mime-fix',
    
    // Im Build-Prozess: Modifiziere die HTML-Ausgabe
    transformIndexHtml(html) {
      // 1. Füge type="application/javascript" zu allen Script-Tags hinzu
      html = html.replace(
        /<script([^>]*)>/g, 
        '<script type="application/javascript"$1>'
      );
      
      // 2. Füge Meta-Tag für MIME-Typ-Sicherheit hinzu
      html = html.replace(
        /<head>/,
        '<head>\n  <meta http-equiv="x-content-type-options" content="nosniff">'
      );
      
      return html;
    },
    
    // Nach dem Build: Füge zusätzliche Info-Dateien hinzu
    closeBundle() {
      // Diese Hook wird nach Abschluss des Builds ausgeführt
      console.log('🔧 MIME-Typ-Fixes wurden angewendet');
    }
  };
}
