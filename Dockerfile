FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm i -g ts-node

RUN npm i

COPY .env .env

RUN npm run build

EXPOSE 3000

CMD [ "ts-node", "src/server/main.ts" ]