# Gebruik een multi-arch base image
FROM --platform=$BUILDPLATFORM httpd:2.4 AS builder

# Stel de werkdirectory in voor HTML
WORKDIR /usr/local/apache2/htdocs

# Kopieer alle website bestanden
COPY public/ .

# Stel de juiste rechten in
RUN chown -R www-data:www-data /usr/local/apache2/htdocs

# Final image (gebruikt de juiste architectuur)
FROM --platform=$TARGETPLATFORM httpd:2.4

# Kopieer de bestanden vanuit de builder
COPY --from=builder /usr/local/apache2/htdocs /usr/local/apache2/htdocs

# Stel de juiste rechten in
RUN chown -R www-data:www-data /usr/local/apache2/htdocs

# Expose poort 80
EXPOSE 80