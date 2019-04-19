FROM node:11-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

ARG PORT

EXPOSE $PORT

CMD PORT=$PORT node app/server.js
