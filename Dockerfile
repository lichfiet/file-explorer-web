FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./package.json /app/package.json
COPY ./src /app/src
COPY ./index.html /app/index.html
COPY ./vite.config.mjs /app/vite.config.js

RUN npm install
# Bundle app source

CMD npm start

EXPOSE 3001