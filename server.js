import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Debug-Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Statische Dateien aus dem dist-Verzeichnis
app.use(express.static(path.join(__dirname, 'dist')));

// Statische Dateien aus dem public-Verzeichnis
app.use('/public', express.static(path.join(__dirname, 'public')));

// Alle anderen Anfragen an die index.html weiterleiten (SPA-Routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log(`Statische Dateien werden ausgeliefert von:`);
  console.log(`- dist: ${path.join(__dirname, 'dist')}`);
  console.log(`- public: ${path.join(__dirname, 'public')}`);
});