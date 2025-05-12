import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mime from 'mime-types'; // Dieser Import benötigt das Paket 'mime-types'

// Ermitteln des aktuellen Dateipfads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle eine Express-App
const app = express();

// MIME-Typen überschreiben - wichtig für Node.js-Hosting-Umgebungen
// die möglicherweise standard MIME-Typen falsch interpretieren
mime.define({
  'application/javascript': ['js', 'jsx', 'mjs'],
  'text/css': ['css'],
  'text/html': ['html', 'htm'],
  'application/json': ['json'],
  'image/svg+xml': ['svg']
});

// Debug-Logging-Middleware
app.use((req, res, next) => {
  console.log(`📄 Anfrage: ${req.method} ${req.url}`);
  next();
});

// WICHTIG: Diese explizite Middleware für JavaScript-Dateien VOR allen anderen Middlewares stellen
app.get('*.js', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  console.log(`🔧 JavaScript-Datei angefordert: ${req.url}`);
  
  if (fs.existsSync(filePath)) {
    // Explizite und direkte Auslieferung von JavaScript-Dateien
    res.removeHeader('Content-Type'); // Entferne vorhandene Content-Type-Header
    res.set({
      'Content-Type': 'application/javascript; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    
    // Datei synchron lesen und ausliefern, um sicherzustellen, dass dies vor anderen Middlewares passiert
    try {
      const content = fs.readFileSync(filePath);
      return res.send(content);
    } catch (err) {
      console.error(`❌ Fehler beim Lesen der JavaScript-Datei: ${err.message}`);
      return next();
    }
  } else {
    console.log(`⚠️ JavaScript-Datei nicht gefunden: ${filePath}`);
    return next();
  }
});

// Ebenfalls für JSX-Dateien
app.get('*.jsx', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  console.log(`🔧 JSX-Datei angefordert: ${req.url}`);
  
  if (fs.existsSync(filePath)) {
    res.removeHeader('Content-Type');
    res.set({
      'Content-Type': 'application/javascript; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    
    try {
      const content = fs.readFileSync(filePath);
      return res.send(content);
    } catch (err) {
      console.error(`❌ Fehler beim Lesen der JSX-Datei: ${err.message}`);
      return next();
    }
  } else {
    console.log(`⚠️ JSX-Datei nicht gefunden: ${filePath}`);
    return next();
  }
});

// Statischer File-Server mit angepassten MIME-Typen
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime.lookup(ext) || 'application/octet-stream';
    
    // Debug-Ausgabe für Content-Type
    console.log(`📁 Auslieferung: ${filePath} mit Content-Type: ${contentType}`);
    
    // Immer explizit den Content-Type setzen
    res.removeHeader('Content-Type'); // Entferne potentiell vorhandene Header
    res.set('Content-Type', contentType);
    res.set('X-Content-Type-Options', 'nosniff');
    
    // Für JavaScript besonders wichtig - nochmals prüfen
    if (ext === '.js' || ext === '.jsx' || ext === '.mjs') {
      res.set('Content-Type', 'application/javascript; charset=utf-8');
      console.log(`🔧 JavaScript MIME-Typ gesetzt für: ${filePath}`);
    }
  }
}));

// Fallback für SPA-Routing
app.get('*', (req, res) => {
  console.log(`🌐 Fallback Route für: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Port-Konfiguration
const PORT = process.env.PORT || 3001;

// Starte den Server
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  console.log(`📂 Dateien werden aus: ${path.join(__dirname, 'dist')} serviert`);

  // Diagnose
  try {
    console.log('📂 Verzeichnisstruktur:');
    const directories = [
      __dirname,
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'dist', 'assets'),
    ];
    
    directories.forEach(dir => {
      if (fs.existsSync(dir)) {
        console.log(`   - ${dir} existiert`);
      } else {
        console.log(`   - ❌ ${dir} existiert NICHT`);
      }
    });
    
    // JS-Dateien finden
    const jsFiles = findJsFiles(path.join(__dirname, 'dist'));
    console.log(`📋 Gefundene JavaScript-Dateien: ${jsFiles.length}`);
    
    if (jsFiles.length === 0) {
      console.error(`❌ KRITISCHES PROBLEM: Keine JavaScript-Dateien gefunden!`);
      console.error(`   → Haben Sie 'npm run build' ausgeführt, bevor Sie den Server gestartet haben?`);
    } else {
      jsFiles.forEach(file => {
        const relPath = path.relative(path.join(__dirname, 'dist'), file);
        console.log(`   - ${relPath}`);
        
        // JS-Datei analysieren - Headers prüfen
        try {
          const stats = fs.statSync(file);
          console.log(`     Größe: ${stats.size} Bytes, Zuletzt geändert: ${stats.mtime}`);
        } catch (err) {
          console.error(`     ❌ Fehler beim Analysieren: ${err.message}`);
        }
      });
    }
  } catch (err) {
    console.error(`❌ Fehler bei der Diagnose: ${err.message}`);
  }
});

// Helper Funktion um JS-Dateien zu finden
function findJsFiles(dir) {
  let results = [];
  try {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Verzeichnis existiert nicht: ${dir}`);
      return results;
    }
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        results = results.concat(findJsFiles(filePath));
      } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error(`❌ Fehler beim Durchsuchen von ${dir}: ${error.message}`);
  }
  return results;
}
