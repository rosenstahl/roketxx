import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import http from 'http';

// Ermittlung der aktuellen Dateipfade
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard Express App
const app = express();

// Express-Static Middleware: Stellt Dateien aus dem dist-Verzeichnis bereit
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // Setze den korrekten MIME-Typ für die jeweiligen Dateiendungen
    switch(ext) {
      case '.html':
        res.set('Content-Type', 'text/html');
        break;
      case '.css':
        res.set('Content-Type', 'text/css');
        break;
      case '.js':
      case '.jsx':
        res.set('Content-Type', 'application/javascript');
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
      // Ergänze hier weitere Dateitypen, falls erforderlich
    }
    
    // Sicherheitsheader setzen
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Fallback für alle anderen Routen – Single Page Application Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// HTTP-Server, der bestimmte Dateianfragen direkt bedient, um die Express-Middleware zu umgehen
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(`📄 Anfrage: ${req.method} ${url}`);
  
  // Dateiendung extrahieren
  const ext = path.extname(url).toLowerCase();
  
  // Falls es sich um eine JavaScript-Datei handelt (.js oder .jsx)
  if (ext === '.js' || ext === '.jsx') {
    console.log(`🔧 JavaScript-Datei erkannt: ${url}`);
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Pfad zur Datei (im dist-Verzeichnis)
    const filePath = path.join(__dirname, 'dist', url);
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      // Falls die Datei nicht direkt gefunden wird, an Express weiterleiten
      app(req, res);
    }
    return;
  }
  
  // Bei JSON-Dateien explizit den JSON-MIME-Typ setzen
  else if (ext === '.json') {
    console.log(`🔧 JSON-Datei erkannt: ${url}`);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    const filePath = path.join(__dirname, 'dist', url);
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      app(req, res);
    }
    return;
  }
  
  // Alle anderen Anfragen über die Express-App abwickeln
  else {
    app(req, res);
    return;
  }
});

// Port-Konfiguration (Standard: 3001)
const PORT = process.env.PORT || 3001;

// Server starten und diagnostische Ausgabe
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  console.log(`📂 Serving files from: ${path.join(__dirname, 'dist')}`);
  
  // Diagnose: Alle JavaScript-Dateien im dist-Verzeichnis auflisten
  try {
    const jsFiles = findJsFiles(path.join(__dirname, 'dist'));
    console.log(`📋 JavaScript-Dateien gefunden: ${jsFiles.length}`);
    jsFiles.forEach(file => {
      console.log(`   - ${path.relative(path.join(__dirname, 'dist'), file)}`);
    });
  } catch (err) {
    console.error(`❌ Fehler beim Auflisten der JavaScript-Dateien: ${err.message}`);
  }
});

// Hilfsfunktion: Rekursive Suche nach JavaScript-Dateien (.js oder .jsx)
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
