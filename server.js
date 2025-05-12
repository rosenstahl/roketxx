import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import http from 'http';

// Ermitteln des aktuellen Dateipfads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle eine Express-App
const app = express();

// Express-Static Middleware: Verweise auf das "dist"-Verzeichnis
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    // MIME-Typen für unterschiedliche Dateiendungen festlegen
    switch(ext) {
      case '.html':
        res.set('Content-Type', 'text/html');
        break;
      case '.css':
        res.set('Content-Type', 'text/css');
        break;
      case '.js':
      case '.jsx':  // Hier wird .jsx genauso behandelt wie .js
        res.set('Content-Type', 'application/javascript'); // Korrekter MIME-Typ für JavaScript
        break;
      case '.json':
        res.set('Content-Type', 'application/json');
        break;
      case '.png':
        res.set('Content-Type', 'image/png');
        break;
      case '.jpg':
      case '.jpeg':
        res.set('Content-Type', 'image/jpeg');
        break;
      case '.gif':
        res.set('Content-Type', 'image/gif');
        break;
      case '.svg':
        res.set('Content-Type', 'image/svg+xml');
        break;
      case '.ico':
        res.set('Content-Type', 'image/x-icon');
        break;
      case '.otf':
        res.set('Content-Type', 'font/otf');
        break;
      case '.ttf':
        res.set('Content-Type', 'font/ttf');
        break;
      case '.woff':
        res.set('Content-Type', 'font/woff');
        break;
      case '.woff2':
        res.set('Content-Type', 'font/woff2');
        break;
      default:
        // Für alle anderen Dateitypen setzen wir keinen expliziten Content-Type
        // Der Server sollte einen passenden Default-Typ wählen
        break;
    }
    
    // Sicherheitsheader setzen
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// ALLE Anfragen für JavaScript-Dateien explizit behandeln
app.get('*.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  next();
});

// ALLE Anfragen für JSX-Dateien explizit behandeln
app.get('*.jsx', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  next();
});

// Fallback für alle anderen Routen: Single Page Application Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Express-App direkt als HTTP-Server verwenden, statt einen separaten HTTP-Server zu erstellen
// Dies verhindert Diskrepanzen bei der MIME-Typ-Behandlung
const server = app;

// Port-Konfiguration: Verwende den Port aus der Umgebung oder 3001 als Standard
const PORT = process.env.PORT || 3001;

// Starte den Server
server.listen(PORT, () => {
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
