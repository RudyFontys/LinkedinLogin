# Gebruik de officiële Apache2 image
FROM httpd:2.4

# Stel de werkdirectory in
WORKDIR /usr/local/apache2/htdocs

# Kopieer alle website bestanden
COPY public/ .

# Stel de juiste rechten in
RUN chown -R www-data:www-data /usr/local/apache2/htdocs

# Stel de omgevingsvariabelen in (optioneel)
ENV LINKEDIN_API_KEY="YOUR_LINKEDIN_API_KEY"

# Expose poort 80
EXPOSE 80