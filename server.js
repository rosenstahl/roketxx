import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BYPASS EXPRESS MIDDLEWARE COMPLETELY FOR JAVASCRIPT FILES
// Dies ist der Schlüssel, da wir die Standard-Express-Middleware umgehen
// und direkt HTTP-Headers setzen
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(`📄 Anfrage: ${req.method} ${url}`);
  
  // Extrahiere Dateityp
  const ext = path.extname(url).toLowerCase();
  
  // Setze Hard-Coded MIME-Type für alle JavaScript-Dateien
  if (ext === '.js') {
    console.log(`🔧 JavaScript-Datei erkannt: ${url}`);
    
    // Kritisch: Setze JavaScript-MIME-Typ direkt
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Versuche die Datei zu finden
    const filePath = path.join(__dirname, 'dist', url);
    
    if (fs.existsSync(filePath)) {
      // Lese und streame die Datei direkt, umgeht Express vollständig
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      // Fallback: Leite an Express weiter
      app(req, res);
    }
  } 
  // Setze Hard-Coded MIME-Type für JSON-Dateien
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
  }
  // Alle anderen Dateitypen normal über Express verarbeiten
  else {
    app(req, res);
  }
});

// Standard Express App
const app = express();

// Express-Middleware
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // Diese MIME-Typen werden mit niedrigerer Priorität gesetzt
    // als die oben im HTTP-Server direkt gesetzten
    switch(ext) {
      case '.html':
        res.set('Content-Type', 'text/html');
        break;
      case '.css':
        res.set('Content-Type', 'text/css');
        break;
      case '.js':
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
    }
    
    // Zusätzliche Sicherheits-Header
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Fallback für alle anderen Routen: SPA-Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Port-Konfiguration
const PORT = process.env.PORT || 3001;

// Server starten
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  console.log(`📂 Serving files from: ${path.join(__dirname, 'dist')}`);
  
  // Diagnostische Ausgabe: Liste alle JS-Dateien im dist-Verzeichnis
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

// Hilfsfunktion: Finde alle JavaScript-Dateien rekursiv
function findJsFiles(dir) {
  let results = [];
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Rekursiv durch Unterverzeichnisse gehen
        results = results.concat(findJsFiles(filePath));
      } else if (filePath.endsWith('.js')) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error(`❌ Fehler beim Durchsuchen von ${dir}: ${error.message}`);
  }
  
  return results;
}