import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Ermitteln des aktuellen Dateipfads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle eine Express-App
const app = express();

// Debug-Logging-Middleware
app.use((req, res, next) => {
  console.log(`📄 Anfrage: ${req.method} ${req.url}`);
  next();
});

// WICHTIG: Diese Middleware muss VOR allen anderen Middlewares stehen
// Explizite JavaScript MIME-Typ-Behandlung
app.get('*.js', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  console.log(`🔧 JavaScript-Datei angefordert: ${req.url}`);
  
  if (fs.existsSync(filePath)) {
    res.set('Content-Type', 'application/javascript');
    res.set('X-Content-Type-Options', 'nosniff');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`❌ Fehler beim Lesen der JavaScript-Datei: ${err.message}`);
        return next();
      }
      return res.send(data);
    });
  } else {
    console.log(`⚠️ JavaScript-Datei nicht gefunden: ${filePath}`);
    return next();
  }
});

// Auch für JSX-Dateien explizit behandeln
app.get('*.jsx', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  console.log(`🔧 JSX-Datei angefordert: ${req.url}`);
  
  if (fs.existsSync(filePath)) {
    res.set('Content-Type', 'application/javascript');
    res.set('X-Content-Type-Options', 'nosniff');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`❌ Fehler beim Lesen der JSX-Datei: ${err.message}`);
        return next();
      }
      return res.send(data);
    });
  } else {
    console.log(`⚠️ JSX-Datei nicht gefunden: ${filePath}`);
    return next();
  }
});

// Express-Static Middleware für alle anderen Dateien
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // MIME-Typen für unterschiedliche Dateiendungen
    switch(ext) {
      case '.html':
        res.set('Content-Type', 'text/html');
        break;
      case '.css':
        res.set('Content-Type', 'text/css');
        break;
      case '.js':
      case '.jsx':
      case '.mjs':
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
    }
    
    // Sicherheitsheader setzen
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

  // Diagnose: Verzeichnisstruktur anzeigen
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
    
    // JavaScript-Dateien auflisten
    const jsFiles = findJsFiles(path.join(__dirname, 'dist'));
    console.log(`📋 Gefundene JavaScript-Dateien: ${jsFiles.length}`);
    jsFiles.forEach(file => {
      console.log(`   - ${path.relative(path.join(__dirname, 'dist'), file)}`);
    });
  } catch (err) {
    console.error(`❌ Fehler bei der Diagnose: ${err.message}`);
  }
});

// Hilfsfunktion: Suche rekursiv nach .js und .jsx Dateien
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
