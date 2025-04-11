import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Liste der Service Worker-Dateien, die blockiert werden sollen
const blockedFiles = [
  'sw.js',
  'workbox-',
  'registerSW',
  'manifest.webmanifest'
];

// Middleware zum Blockieren von Service Worker-Anfragen
app.use((req, res, next) => {
  // Prüfe, ob die angeforderte URL eine blockierte Datei enthält
  if (blockedFiles.some(file => req.url.includes(file))) {
    console.log(`⛔ Blockierte Anfrage: ${req.url}`);
    return res.status(404).send('Not found (Service Worker disabled)');
  }
  
  console.log(`📄 Anfrage: ${req.method} ${req.url}`);
  next();
});

// Statische Dateien mit expliziten MIME-Typen
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    // JavaScript-Dateien richtig als 'application/javascript' ausliefern
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
    else if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    else if (filePath.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
    else if (filePath.endsWith('.html')) {
      res.set('Content-Type', 'text/html');
    }
    else if (filePath.endsWith('.otf')) {
      res.set('Content-Type', 'font/otf');
    }
    else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.svg')) {
      // Bilder mit korrektem MIME-Typ
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };
      res.set('Content-Type', mimeTypes[ext]);
    }
    
    // Sicherheits-Header
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Alle anderen Anfragen zu index.html umleiten (SPA-Routing)
app.get('*', (req, res) => {
  console.log(`🔀 SPA-Routing: ${req.url} -> index.html`);
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
    
    // Suche nach Service Worker-Dateien
    const files = fs.readdirSync(distPath);
    const swFiles = files.filter(file => 
      file.includes('sw.js') || 
      file.includes('workbox') || 
      file.includes('registerSW')
    );
    
    if (swFiles.length > 0) {
      console.log(`⚠️ ${swFiles.length} Service Worker-Dateien gefunden:`);
      swFiles.forEach(file => console.log(`   - ${file}`));
      console.log(`Diese könnten Probleme verursachen!`);
    } else {
      console.log(`✅ Keine Service Worker-Dateien im Root-Verzeichnis`);
    }
  } else {
    console.log(`❌ dist-Verzeichnis NICHT gefunden!`);
  }
});