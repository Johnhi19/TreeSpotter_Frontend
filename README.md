# TreeSpotter Frontend

The frontend repository for the [Treespotter](https://github.com/Johnhi19/TreeSpotter) application. Containing all the necessary code and Dockerfiles needed to run this frontend.

## Prerequisites
- Docker (desktop or engine)

For local development:
- Node version >= v20.19.6
- Angular version >= 19.0.6

## Usage with docker
It is recommended to run the complete application. For that check the README.md of the main [Treespotter](https://github.com/Johnhi19/TreeSpotter) application. 

If you want only want to build and run the frontend, it can be done like this:

```bash
# Build the image
docker -f Dockerfile.dev build -t frontend .

# Run the container
docker run -d --name frontend -p 4200:4200 frontend

# Container IDs
docker ps

# Stop the container
docker stop <ID>

# Remove the container
docker rm <ID>
# While running (you have to force it):
docker rm <ID> -f

# check if it works via this url
curl http://localhost:4200/
```

The backend then runs on port 4200 of the localhost.

## Usage without docker (Only for local development)
For local development run

```bash
# Install the dependencies
npm install

# Run the dev mode
ng serve
```

The resulting frontend should run on port 4200 of the localhost.



