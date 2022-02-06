###
# Builder
###
FROM node:16 as runner

WORKDIR /runner

COPY package.json yarn.lock .yarnrc.yml .env ./
COPY .yarn ./.yarn

RUN yarn install

COPY . ./

RUN yarn generate
RUN yarn build:worker

CMD ["node", "./dist-worker"]
