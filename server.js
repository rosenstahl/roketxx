import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Logger für alle Anfragen
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Statische Dateien mit korrekten MIME-Typen
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // MIME-Typen für verschiedene Dateiformate
    if (ext === '.js') res.set('Content-Type', 'application/javascript');
    if (ext === '.css') res.set('Content-Type', 'text/css');
    if (ext === '.json') res.set('Content-Type', 'application/json');
    if (ext === '.png') res.set('Content-Type', 'image/png');
    if (ext === '.jpg' || ext === '.jpeg') res.set('Content-Type', 'image/jpeg');
    if (ext === '.svg') res.set('Content-Type', 'image/svg+xml');
    if (ext === '.woff') res.set('Content-Type', 'font/woff');
    if (ext === '.woff2') res.set('Content-Type', 'font/woff2');
    if (ext === '.ttf') res.set('Content-Type', 'font/ttf');
    if (ext === '.otf') res.set('Content-Type', 'font/otf');
    
    // Sicherheits-Header
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Cache-Header für statische Assets
    if (ext.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|otf)$/)) {
      res.set('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// SPA-Routing 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log(`Statische Dateien werden ausgeliefert von: ${path.join(__dirname, 'dist')}`);
});