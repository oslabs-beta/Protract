FROM node:18

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node" , "src/server/main.ts"]