#!/bin/bash

# Farben für bessere Lesbarkeit
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Domain-Namen
DOMAIN="roketx.de"
WWW_DOMAIN="www.roketx.de"

echo "${GREEN}🔒 Setting up SSL certificate for $DOMAIN and $WWW_DOMAIN${NC}"

# Certbot installieren
echo "Installing Certbot..."
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# SSL-Zertifikat generieren
echo "Generating SSL certificate..."
sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos --email info@roketx.de

# Nginx neu starten
echo "Restarting Nginx..."
sudo systemctl restart nginx

# SSL-Zertifikat-Status prüfen
echo "Checking certificate status..."
sudo certbot certificates

echo "${GREEN}✅ SSL certificate setup completed!${NC}"

# Auto-Renewal testen
echo "Testing auto-renewal..."
sudo certbot renew --dry-run