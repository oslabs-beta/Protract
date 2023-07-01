FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm i -g ts-node

RUN npm i

RUN npm run build

EXPOSE 3000

RUN npm start