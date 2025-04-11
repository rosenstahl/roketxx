import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Spezielle Route für manifest.json
app.get('/manifest.json', (req, res) => {
  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    res.set('Content-Type', 'application/json');
    res.sendFile(manifestPath);
  } else {
    res.status(404).send('Manifest not found');
  }
});

// Spezielle Routen für Fonts
app.get('/fonts/:fontFile', (req, res) => {
  const fontFile = req.params.fontFile;
  const fontPath = path.join(__dirname, 'public', 'fonts', fontFile);
  
  if (fs.existsSync(fontPath)) {
    if (fontFile.endsWith('.OTF') || fontFile.endsWith('.otf')) {
      res.set('Content-Type', 'font/otf');
    } else if (fontFile.endsWith('.woff2')) {
      res.set('Content-Type', 'font/woff2');
    } else if (fontFile.endsWith('.woff')) {
      res.set('Content-Type', 'font/woff');
    } else if (fontFile.endsWith('.ttf')) {
      res.set('Content-Type', 'font/ttf');
    }
    res.sendFile(fontPath);
  } else {
    console.error(`Font nicht gefunden: ${fontPath}`);
    res.status(404).send('Font not found');
  }
});

// Statische Dateien aus dem dist-Verzeichnis
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.js') res.set('Content-Type', 'application/javascript');
    if (ext === '.css') res.set('Content-Type', 'text/css');
    if (ext === '.json') res.set('Content-Type', 'application/json');
    if (ext === '.png') res.set('Content-Type', 'image/png');
    if (ext === '.jpg' || ext === '.jpeg') res.set('Content-Type', 'image/jpeg');
    if (ext === '.svg') res.set('Content-Type', 'image/svg+xml');
    
    // Sicherheits-Header
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Cache-Header
    if (ext.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|otf)$/)) {
      res.set('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Statische Dateien aus dem public-Verzeichnis als Fallback
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.otf') res.set('Content-Type', 'font/otf');
    if (ext === '.woff2') res.set('Content-Type', 'font/woff2');
    if (ext === '.woff') res.set('Content-Type', 'font/woff');
    if (ext === '.ttf') res.set('Content-Type', 'font/ttf');
    if (ext === '.json') res.set('Content-Type', 'application/json');
    
    // Cache-Header
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// SPA-Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  
  // Diagnostische Informationen
  console.log(`Statische Dateien werden ausgeliefert von:`);
  console.log(`- dist: ${path.join(__dirname, 'dist')}`);
  console.log(`- public: ${path.join(__dirname, 'public')}`);
  
  // Überprüfe, ob kritische Dateien existieren
  const manifestPath = path.join(__dirname, 'public', 'manifest.json');
  console.log(`manifest.json existiert: ${fs.existsSync(manifestPath)}`);
  
  const fontPath1 = path.join(__dirname, 'public', 'fonts', 'SFPRODISPLAYMEDIUM.OTF');
  console.log(`SFPRODISPLAYMEDIUM.OTF existiert: ${fs.existsSync(fontPath1)}`);
  
  const fontPath2 = path.join(__dirname, 'public', 'fonts', 'SFPRODISPLAYREGULAR.OTF');
  console.log(`SFPRODISPLAYREGULAR.OTF existiert: ${fs.existsSync(fontPath2)}`);
});