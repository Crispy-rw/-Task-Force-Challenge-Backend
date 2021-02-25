# build commands
FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./

EXPOSE 5001

RUN npm install