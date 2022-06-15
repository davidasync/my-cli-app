FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --pure-lockfile --non-interactive
COPY . .

ENTRYPOINT ["node", "index.js"]