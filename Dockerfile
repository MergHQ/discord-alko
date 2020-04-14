FROM node:13.0.0

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

CMD ["node", "./dist/app.js"]