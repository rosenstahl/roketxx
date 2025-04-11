#!/bin/bash

# Dieses Skript löscht alle Service Worker-bezogenen Dateien aus dem Projekt
echo "Lösche Service Worker-Dateien..."

# Lösche dist-Verzeichnis vollständig
echo "Lösche dist-Verzeichnis..."
rm -rf dist

# Lösche alle Service Worker-bezogenen Dateien
echo "Lösche Service Worker-Dateien..."
rm -f sw.js workbox*.js *registerSW*.js manifest.webmanifest

# Lösche node_modules/.vite-Verzeichnis
echo "Lösche .vite Cache..."
rm -rf node_modules/.vite

# Lösche package-lock.json und node_modules
echo "Lösche package-lock.json..."
rm -f package-lock.json

echo "Cleanup abgeschlossen. Bitte führe 'npm install' und 'npm run build' erneut aus."
