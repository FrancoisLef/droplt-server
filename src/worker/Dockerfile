FROM node:16

WORKDIR /worker

COPY package.json yarn.lock .yarnrc.yml .env ./
COPY .yarn ./.yarn

RUN yarn install

COPY . ./

RUN yarn generate
RUN yarn build:worker

CMD ["node", "./dist-worker/worker/index.js"]
