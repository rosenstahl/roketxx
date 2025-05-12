import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Aktuelle Dateipfade
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express-App erstellen
const app = express();

// Kritisch: Spezieller Middleware-Handler für JS-Dateien
app.use((req, res, next) => {
  const url = req.url;
  
  // Wenn es eine .js-Datei ist oder im assets/js Verzeichnis
  if (url.endsWith('.js') || url.includes('/assets/js/')) {
    const filePath = path.join(__dirname, 'dist', url);
    
    // Prüfen ob die Datei existiert
    if (fs.existsSync(filePath)) {
      console.log(`Serving JS file: ${url}`);
      
      // Wichtig: Content-Type MUSS so gesetzt werden
      res.set({
        'Content-Type': 'application/javascript',
        'X-Content-Type-Options': 'nosniff',
      });
      
      // Datei direkt senden
      return res.sendFile(filePath);
    }
  }
  
  // Weitermachen für andere Dateien
  next();
});

// Statische Dateien servieren
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
