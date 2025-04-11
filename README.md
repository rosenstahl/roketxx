# RoketX

Diese React-Anwendung wurde mit Vite erstellt und kann als statische Website oder mit einem Node.js-Server bereitgestellt werden.

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## Produktionsbereitstellung

### Option 1: Bereitstellung mit Node.js (empfohlen für a2fbe.webhosting.systems)

Diese Methode verwendet Express, um die gebauten statischen Dateien zu servieren:

```bash
# Projekt bauen
npm run build

# Server starten (über den hinzugefügten server.js)
npm start
```

Bei Verwendung im Webhosting-Kontrollpanel:
1. Klonen Sie das Repository in Ihren Webspace
2. Installieren Sie die Abhängigkeiten mit `npm install`
3. Bauen Sie das Projekt mit `npm run build`
4. Stellen Sie sicher, dass Node.js aktiviert ist
5. Setzen Sie `server.js` als Anwendungsstartdatei
6. Starten Sie die Node.js-Anwendung über das Kontrollpanel

### Option 2: Statische Bereitstellung

Alternativ können Sie die gebauten Dateien direkt auf einem Webserver hosten:

```bash
# Projekt bauen
npm run build
```

Die gebauten Dateien befinden sich im `dist`-Verzeichnis und können auf jeden Webserver hochgeladen werden.

## Nginx-Konfiguration

Eine Beispiel-Nginx-Konfiguration ist im Verzeichnis `nginx/` enthalten.
