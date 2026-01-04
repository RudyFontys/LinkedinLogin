# Gebruik een lichtgewicht ARM-compatibele webserver (nginx)
FROM --platform=linux/arm64 nginx:alpine

# Kopieer de statische bestanden naar de nginx webroot
COPY public/ /usr/share/nginx/html/

# Expose poort 80 (standaard voor nginx)
EXPOSE 80