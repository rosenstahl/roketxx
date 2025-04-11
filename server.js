import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Explizite MIME-Typen-Zuordnung für alle wichtigen Dateitypen
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript', 
  '.mjs': 'application/javascript',
  '.cjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml'
};

// Logger für alle Anfragen
app.use((req, res, next) => {
  console.log(`📄 Anfrage: ${req.method} ${req.url}`);
  next();
});

// Blockiere Service Worker-Dateien (falls vorhanden)
app.use((req, res, next) => {
  const blockedFiles = ['sw.js', 'workbox-', 'registerSW'];
  if (blockedFiles.some(file => req.url.includes(file))) {
    console.log(`⛔ Blockierte Service Worker-Anfrage: ${req.url}`);
    return res.status(404).send('Not found');
  }
  next();
});

// Middleware für korrekte MIME-Typen basierend auf der URL-Anfrage
app.use((req, res, next) => {
  // Extrahiere die Dateiendung aus der URL
  const urlExt = path.extname(req.url).toLowerCase();
  
  if (urlExt && mimeTypes[urlExt]) {
    // Setze MIME-Typ basierend auf URL-Endung
    console.log(`🔄 Setze MIME-Typ für ${req.url}: ${mimeTypes[urlExt]}`);
    res.set('Content-Type', mimeTypes[urlExt]);
    
    // Wichtig: Füge nosniff-Header hinzu, um MIME-Sniffing zu verhindern
    res.set('X-Content-Type-Options', 'nosniff');
  }
  
  next();
});

// Statische Dateien aus dem dist-Verzeichnis servieren
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // Setze für alle bekannten Dateitypen explizit den MIME-Typ
    if (mimeTypes[ext]) {
      console.log(`📦 Serviere ${path.basename(filePath)} als ${mimeTypes[ext]}`);
      res.set('Content-Type', mimeTypes[ext]);
    }
    
    // Cache-Header für statische Assets
    if (ext !== '.html') {
      res.set('Cache-Control', 'public, max-age=31536000');
    }
    
    // Sicherheits-Header
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Express-statische Middleware für alle JS-Dateien mit explizitem MIME-Typ
app.get('*.js', (req, res, next) => {
  console.log(`🔄 JavaScript-Datei angefordert: ${req.url}`);
  res.set('Content-Type', 'application/javascript');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});

// Express-statische Middleware für alle JSON-Dateien mit explizitem MIME-Typ
app.get('*.json', (req, res, next) => {
  console.log(`🔄 JSON-Datei angefordert: ${req.url}`);
  res.set('Content-Type', 'application/json');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});

// SPA-Routing - alle anderen Anfragen zu index.html umleiten
app.get('*', (req, res) => {
  console.log(`🔀 SPA-Routing: ${req.url} -> index.html`);
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  
  // Versuche dist-Verzeichnis zu analysieren
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log(`✅ dist-Verzeichnis gefunden`);
    
    // Prüfe ob index.html existiert
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log(`✅ index.html gefunden`);
    } else {
      console.log(`❌ index.html NICHT gefunden!`);
    }
    
    // Zeige JS-Dateien im dist-Verzeichnis
    const jsFiles = findAllFiles(distPath, '.js');
    console.log(`🔍 Gefundene JS-Dateien (${jsFiles.length}):`);
    jsFiles.slice(0, 5).forEach(file => {
      console.log(`   - ${path.relative(distPath, file)}`);
    });
    if (jsFiles.length > 5) {
      console.log(`   ... und ${jsFiles.length - 5} weitere Dateien`);
    }
  } else {
    console.log(`❌ dist-Verzeichnis NICHT gefunden!`);
  }
});

// Hilfsfunktion zum Finden aller Dateien mit einem bestimmten Dateityp
function findAllFiles(dir, extension) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    
    if (stat && stat.isDirectory()) {
      // Rekursiv durchsuchen
      results = results.concat(findAllFiles(file, extension));
    } else {
      // Prüfen, ob die Datei die gesuchte Endung hat
      if (file.endsWith(extension)) {
        results.push(file);
      }
    }
  });
  
  return results;
}