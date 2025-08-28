# syntax=docker/dockerfile:1

# Use nginx alpine image to serve static files
FROM nginx:alpine

# Copy Calculator static files to nginx web directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80 for web traffic
EXPOSE 80

# nginx runs automatically when container starts
