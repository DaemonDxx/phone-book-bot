FROM node:16-alpine as development
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./ts*.json ./
RUN npm install glob rimraf
RUN npm install
COPY ./src ./src
RUN npm run build

FROM node:16-alpine as production
WORKDIR /usr/bot
COPY ./package*.json ./
RUN npm install --production
COPY --from=development /usr/src/app/dist ./
CMD ["node", "main"]