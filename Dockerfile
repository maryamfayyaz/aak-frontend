From node:22 as builder

WORKDIR /app
# COPY package*.json ./
COPY . .
RUN npm install

CMD [ "npm", "run", "dev" ]