import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Ermitteln des aktuellen Dateipfads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle eine Express-App
const app = express();

// Definiere manuelle MIME-Typen
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.mjs': 'application/javascript',
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
};

// Debug-Logging-Middleware
app.use((req, res, next) => {
  console.log(`📄 Anfrage: ${req.method} ${req.url}`);
  next();
});

// Manuelle Handhabung für JavaScript-Dateien
app.get('*.js', (req, res) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  console.log(`🔧 JavaScript-Datei angefordert: ${req.url} (Pfad: ${filePath})`);
  
  if (fs.existsSync(filePath)) {
    res.set('Content-Type', 'application/javascript');
    res.set('X-Content-Type-Options', 'nosniff');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    console.log(`⚠️ JavaScript-Datei nicht gefunden: ${filePath}`);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

// Benutzerdefinierte Statische-Dateien-Middleware
app.use((req, res, next) => {
  // Prüfen, ob die angeforderte Datei existiert
  const filePath = path.join(__dirname, 'dist', req.url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    
    // MIME-Typ für bekannte Dateiendungen setzen
    if (mimeTypes[ext]) {
      res.set('Content-Type', mimeTypes[ext]);
      res.set('X-Content-Type-Options', 'nosniff');
      console.log(`📁 Datei gefunden: ${req.url} (Typ: ${mimeTypes[ext]})`);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      console.log(`📁 Datei gefunden: ${req.url} (Unbekannter Typ)`);
      next();
    }
  } else {
    // Für nicht existierende Dateien weitermachen
    next();
  }
});

// Express-Static Middleware als Fallback
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (mimeTypes[ext]) {
      res.set('Content-Type', mimeTypes[ext]);
    }
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Fallback für alle anderen Routen: Single Page Application Routing
app.get('*', (req, res) => {
  console.log(`🌐 Fallback Route für: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Port-Konfiguration: Verwende den Port aus der Umgebung oder 3001 als Standard
const PORT = process.env.PORT || 3001;

// Starte den Server
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  console.log(`📂 Dateien werden aus: ${path.join(__dirname, 'dist')} serviert`);

  // Diagnose: Alle JavaScript-Dateien im "dist"-Verzeichnis auflisten
  try {
    const jsFiles = findJsFiles(path.join(__dirname, 'dist'));
    console.log(`📋 Gefundene JavaScript-Dateien: ${jsFiles.length}`);
    jsFiles.forEach(file => {
      console.log(`   - ${path.relative(path.join(__dirname, 'dist'), file)}`);
    });
  } catch (err) {
    console.error(`❌ Fehler beim Auflisten der JavaScript-Dateien: ${err.message}`);
  }
});

// Hilfsfunktion: Suche rekursiv nach .js und .jsx Dateien
function findJsFiles(dir) {
  let results = [];
  try {
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
