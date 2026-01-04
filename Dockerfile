# Gebruik een multi-platform base image (werkt op ARM en x86)
FROM nginx:alpine

# Kopieer statische bestanden naar de webroot
COPY public/ /usr/share/nginx/html/

# Expose poort 80 (standaard voor nginx)
EXPOSE 80