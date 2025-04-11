import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// EXPLIZITE MIME-TYPE-MAP FÜR ALLE DATEITYPEN
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.xml': 'application/xml'
};

// DETAILLIERTES LOGGING FÜR ALLE ANFRAGEN
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📥 ${req.method} ${req.url}`);
  
  // Originale end-Methode speichern
  const originalEnd = res.end;
  
  // end-Methode überschreiben, um Response-Status zu loggen
  res.end = function() {
    const duration = Date.now() - start;
    console.log(`📤 ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`);
    originalEnd.apply(res, arguments);
  };
  
  next();
});

// DIREKTES SERVIEREN VON DATEIEN MIT EXPLIZITEM MIME-TYP
app.get('*', (req, res, next) => {
  // Versuche zuerst aus dist zu servieren
  let filePath = path.join(__dirname, 'dist', req.path);
  
  // Falls nicht in dist, versuche aus public
  if (!fs.existsSync(filePath) && !req.path.includes('..')) {
    filePath = path.join(__dirname, 'public', req.path);
  }
  
  // Routen für Index-Dateien
  if (req.path === '/' || req.path === '') {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }
  
  // Überprüfe, ob Datei existiert
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    console.log(`🔍 Serving ${filePath} with Content-Type: ${contentType}`);
    
    // WICHTIG: Explizit Content-Type setzen
    res.setHeader('Content-Type', contentType);
    
    // Sicherheits-Header
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Datei senden
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Wenn keine physische Datei gefunden wurde, für SPA-Routing zur Index weiterleiten
    if (req.path.indexOf('.') === -1) {
      console.log(`🔄 Forwarding ${req.path} to index.html (SPA routing)`);
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream(path.join(__dirname, 'dist', 'index.html')).pipe(res);
    } else {
      console.log(`⚠️ File not found: ${filePath}`);
      next();
    }
  }
});

// Fallback für 404
app.use((req, res) => {
  console.log(`🚫 404 Not Found: ${req.url}`);
  res.status(404).send('Not Found');
});

// Expliziter Error-Handler
app.use((err, req, res, next) => {
  console.error(`🔥 Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
  console.log(`📂 Serving files from:`);
  console.log(`   - ${path.join(__dirname, 'dist')}`);
  console.log(`   - ${path.join(__dirname, 'public')}`);
  
  // Überprüfe dist-Verzeichnis
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log(`✅ dist-Verzeichnis existiert`);
    const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
    console.log(`   - Enthält ${distFiles.length} Dateien/Verzeichnisse`);
    console.log(`   - Dateien: ${distFiles.slice(0, 5).join(', ')}${distFiles.length > 5 ? '...' : ''}`);
    
    // Prüfe index.html
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log(`✅ index.html existiert in dist`);
    } else {
      console.log(`❌ index.html existiert NICHT in dist!`);
    }
    
    // Prüfe, ob JS-Dateien existieren
    const jsFiles = distFiles.filter(f => f.endsWith('.js'));
    if (jsFiles.length > 0) {
      console.log(`✅ ${jsFiles.length} JavaScript-Dateien gefunden`);
      console.log(`   - JS-Dateien: ${jsFiles.join(', ')}`);
    } else {
      console.log(`❌ Keine JavaScript-Dateien in dist gefunden!`);
    }
  } else {
    console.log(`❌ dist-Verzeichnis existiert NICHT!`);
  }
});