#!/usr/bin/env node

/**
 * build-and-fix.js - Vorbereitet die Anwendung für das Hosting
 * 
 * Dieses Skript:
 * 1. Führt einen sauberen Build aus
 * 2. Modifiziert die generierten Script-Tags in index.html, um MIME-Typ-Probleme zu vermeiden
 * 3. Fügt Meta-Tags für eine bessere Typ-Behandlung hinzu
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Verzeichnispfade
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
const distIndexPath = path.join(distPath, 'index.html');

console.log('🚀 Build-und-Fix-Skript gestartet');

// 1. Build durchführen
console.log('📦 Führe Build-Prozess durch...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build erfolgreich abgeschlossen');
} catch (error) {
  console.error('❌ Build fehlgeschlagen:', error.message);
  process.exit(1);
}

// 2. Prüfen, ob dist-Verzeichnis existiert
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist-Verzeichnis nicht gefunden. Build fehlgeschlagen?');
  process.exit(1);
}

// 3. index.html anpassen
console.log('🔧 Passe index.html an...');
try {
  let indexHtml = fs.readFileSync(distIndexPath, 'utf8');
  
  // a) Script-Tags modifizieren - type="application/javascript" hinzufügen
  indexHtml = indexHtml.replace(
    /<script([^>]*)>/g, 
    '<script type="application/javascript"$1>'
  );
  
  // b) Meta-Tag für MIME-Typ-Behandlung hinzufügen
  indexHtml = indexHtml.replace(
    /<head>/,
    '<head>\n  <meta http-equiv="x-content-type-options" content="nosniff">'
  );
  
  // Datei speichern
  fs.writeFileSync(distIndexPath, indexHtml);
  console.log('✅ index.html erfolgreich angepasst');
} catch (error) {
  console.error('❌ Fehler beim Anpassen der index.html:', error.message);
}

// 4. Verzeichnisstruktur ausgeben
console.log('📂 Generierte Dateien:');
function listDir(dir, indent = '') {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    console.log(`${indent}- ${item} ${stats.isDirectory() ? '(Verzeichnis)' : `(${stats.size} Bytes)`}`);
    
    if (stats.isDirectory()) {
      listDir(itemPath, `${indent}  `);
    }
  });
}
listDir(distPath);

// 5. Hinweise ausgeben
console.log('\n📝 Wichtige Hinweise:');
console.log('1. Stellen Sie sicher, dass der Node.js-Server im "production"-Modus läuft');
console.log('2. Führen Sie dieses Skript nach jeder Änderung erneut aus');
console.log('3. Laden Sie das gesamte dist-Verzeichnis mit exakter Struktur zum Server hoch');
console.log('\n🎉 Build-und-Fix abgeschlossen!\n');
