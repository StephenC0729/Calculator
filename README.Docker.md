### Building and running the Calculator

Start the Calculator web application by running:
```bash
docker compose up --build
```

The application will be available at: **http://localhost:8080**

### Using Docker directly

You can also build and run the container directly:

```bash
# Build the image
docker build -t calculator .

# Run the container
docker run -p 8080:80 calculator
```

### What's included

- **Static web server**: Uses nginx to serve the Calculator files
- **Port mapping**: Exposes the app on port 8080 (maps to container port 80)
- **Optimized build**: Lightweight nginx:alpine base image

### Deploying to the cloud

For cloud deployment, build for the appropriate platform:

```bash
# For AMD64 platforms (most cloud providers)
docker build --platform=linux/amd64 -t calculator .

# Tag and push to your registry
docker tag calculator your-registry.com/calculator
docker push your-registry.com/calculator
```