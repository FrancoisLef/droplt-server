###
# Builder
###
FROM node:16 as builder

WORKDIR /builder

COPY package.json yarn.lock .yarnrc.yml .env ./
COPY .yarn ./.yarn

RUN yarn install

COPY . ./

RUN yarn generate
RUN yarn build:worker

###
# Runner
###
FROM node:16 as runner

WORKDIR /runner
ENV NODE_ENV=production

COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/dist-worker ./dist
COPY --from=builder /builder/.env ./

RUN ls -la
RUN pwd

CMD ["node", "./dist"]
