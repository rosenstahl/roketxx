import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Einfaches Logging-Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Statische Dateien mit korrekten MIME-Typen ausliefern
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    // Explizite Zuordnung von MIME-Typen für JavaScript-Dateien
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
    else if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    else if (filePath.endsWith('.html')) {
      res.set('Content-Type', 'text/html');
    }
    else if (filePath.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
    else if (filePath.endsWith('.png')) {
      res.set('Content-Type', 'image/png');
    }
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.set('Content-Type', 'image/jpeg');
    }
    else if (filePath.endsWith('.svg')) {
      res.set('Content-Type', 'image/svg+xml');
    }
    else if (filePath.endsWith('.woff')) {
      res.set('Content-Type', 'font/woff');
    }
    else if (filePath.endsWith('.woff2')) {
      res.set('Content-Type', 'font/woff2');
    }
    else if (filePath.endsWith('.ttf')) {
      res.set('Content-Type', 'font/ttf');
    }
    else if (filePath.endsWith('.otf')) {
      res.set('Content-Type', 'font/otf');
    }
  }
}));

// Für alle anderen Anfragen, die keine statischen Dateien sind, die index.html ausliefern
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});