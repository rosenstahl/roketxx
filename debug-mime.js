// debug-mime.js - Hilft bei der Diagnose des MIME-Typ-Problems
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3001;

// Liste aller Dateien im dist-Verzeichnis
const listAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      listAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
};

// Server starten
app.listen(PORT, () => {
  console.log(`Debug-Server läuft auf Port ${PORT}`);
  
  // Prüfe, ob dist-Verzeichnis existiert
  const distPath = path.join(__dirname, 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log(`✅ dist-Verzeichnis gefunden: ${distPath}`);
    
    // Liste alle Dateien auf
    const allFiles = listAllFiles(distPath);
    console.log(`Enthält ${allFiles.length} Dateien:`);
    
    // Suche nach Service Worker-Dateien
    const serviceWorkerFiles = allFiles.filter(file => 
      file.includes('sw.js') || 
      file.includes('workbox') || 
      file.includes('registerSW') || 
      file.includes('manifest.webmanifest')
    );
    
    if (serviceWorkerFiles.length > 0) {
      console.log(`⚠️ ${serviceWorkerFiles.length} Service Worker-Dateien gefunden:`);
      serviceWorkerFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
    } else {
      console.log(`✅ Keine Service Worker-Dateien gefunden.`);
    }
    
    // Suche nach Javascript-Dateien
    const jsFiles = allFiles.filter(file => file.endsWith('.js'));
    console.log(`📄 ${jsFiles.length} JavaScript-Dateien gefunden`);
    
    // Suche nach HTML-Dateien
    const htmlFiles = allFiles.filter(file => file.endsWith('.html'));
    if (htmlFiles.length > 0) {
      console.log(`📄 ${htmlFiles.length} HTML-Dateien gefunden:`);
      htmlFiles.forEach(file => {
        console.log(`   - ${file}`);
        
        // Prüfe, ob HTML-Datei Service Worker-Referenzen enthält
        const content = fs.readFileSync(file, 'utf8');
        if (
          content.includes('serviceWorker') || 
          content.includes('registerSW') || 
          content.includes('workbox')
        ) {
          console.log(`   ⚠️ Diese HTML-Datei enthält Service Worker-Referenzen!`);
        }
      });
    } else {
      console.log(`❌ Keine HTML-Dateien gefunden.`);
    }
  } else {
    console.log(`❌ Kein dist-Verzeichnis gefunden.`);
  }
});
