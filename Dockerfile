FROM arm64v8/node:13.0.0-alpine

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

CMD ["node", "./dist/app.js"]