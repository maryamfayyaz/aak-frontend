# aak-frontend

# For Docker
## Build
 docker build -t frontend-dev ./

## Run the Container
docker run -it -p 5173:5173  frontend-dev

# For Local
## Use Node 22
nvm use 22 or nvm use as .nvmrc file exist


## Install Dependencies
npm i

## Run
npm run dev

### Use This env
VITE_API_BASE_URL=http://localhost:8000
