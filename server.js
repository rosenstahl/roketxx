import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Aktuelle Dateipfade
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App
const app = express();

// Ausführliches Debug-Logging
app.use((req, res, next) => {
  console.log(`[DEBUG] Anfrage: ${req.method} ${req.url}`);
  console.log(`[DEBUG] Headers: ${JSON.stringify(req.headers, null, 2)}`);
  next();
});

// KRITISCH: Verzeichnisstruktur prüfen
console.log('[STARTUP] Prüfe Verzeichnisstruktur...');
const distPath = path.join(__dirname, 'dist');
const distExists = fs.existsSync(distPath);

console.log(`[STARTUP] Dist-Verzeichnis (${distPath}): ${distExists ? 'EXISTIERT' : 'FEHLT!!!'}`);

if (distExists) {
  try {
    const items = fs.readdirSync(distPath);
    console.log(`[STARTUP] Dist-Inhalte (${items.length} Einträge):`);
    items.forEach(item => {
      const itemPath = path.join(distPath, item);
      const stats = fs.statSync(itemPath);
      console.log(`[STARTUP]   - ${item} (${stats.isDirectory() ? 'Verzeichnis' : 'Datei'}, ${stats.size} Bytes)`);
    });
  } catch (err) {
    console.error(`[ERROR] Fehler beim Lesen des Dist-Verzeichnisses: ${err.message}`);
  }
} else {
  console.error('[ERROR] KRITISCH: Dist-Verzeichnis existiert nicht! Baue das Projekt mit "npm run build"');
}

// MIME-Typen explizit definieren
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
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

// Explizite Handler für alle JavaScript-Dateien
app.get('*', (req, res, next) => {
  const url = req.url;
  const ext = path.extname(url).toLowerCase();
  
  // Wenn es eine JavaScript-Datei ist (einschließlich solcher mit Hashes im Namen)
  if (ext === '.js' || ext === '.jsx' || ext === '.mjs' || url.includes('assets/js/')) {
    console.log(`[DEBUG] JavaScript-Datei erkannt: ${url}`);
    
    // Alle möglichen Pfade prüfen
    const possiblePaths = [
      path.join(__dirname, 'dist', url), // Standard-Pfad
      path.join(__dirname, url.startsWith('/') ? url.substring(1) : url), // Relativer Pfad
      path.join(distPath, url.startsWith('/') ? url.substring(1) : url), // Dist-relativer Pfad
    ];
    
    // Prüfe jeden Pfad
    for (const filePath of possiblePaths) {
      console.log(`[DEBUG] Prüfe Pfad: ${filePath}`);
      
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        console.log(`[DEBUG] Datei gefunden: ${filePath}`);
        
        // MIME-Typ korrekt setzen
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        // Datei direkt senden
        try {
          const fileContent = fs.readFileSync(filePath);
          return res.send(fileContent);
        } catch (err) {
          console.error(`[ERROR] Fehler beim Lesen der Datei ${filePath}: ${err.message}`);
        }
      }
    }
  }
  
  // Wenn keine JavaScript-Datei oder Datei nicht gefunden, weiter zum nächsten Handler
  next();
});

// Statische Dateien mit angepassten MIME-Typen
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // MIME-Typ setzen
    if (mimeTypes[ext]) {
      res.setHeader('Content-Type', mimeTypes[ext]);
      console.log(`[DEBUG] MIME-Typ gesetzt für ${filePath}: ${mimeTypes[ext]}`);
    }
    
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Caching deaktivieren im Debug-Modus
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Fallback-Route für SPA (wichtig!)
app.get('*', (req, res) => {
  console.log(`[DEBUG] Fallback-Route für: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[STARTUP] Server läuft auf Port ${PORT}`);
  console.log(`[STARTUP] Server-Modus: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[STARTUP] Dateien werden aus: ${path.join(__dirname, 'dist')} serviert`);
});
