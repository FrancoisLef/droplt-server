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

COPY --from=builder /builder/worker ./
# COPY --from=builder /builder/.env /usr/share/nginx/html/.env
# COPY --from=builder /builder/nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -la
RUN pwd

# FROM node:lts as builder
# # change working directory
# WORKDIR /service-builder
# # copy only necessary files for dependencies install
# COPY package.json yarn.lock .env.example .
# # install dependencies
# RUN yarn install --frozen-lockfile
# # copy project files
# COPY . .
# # build service
# RUN yarn build

# FROM node:lts as runner
# # change working directory
# WORKDIR /service-runner
# # copy build output
# COPY --from=builder /service-builder/dist .
# # install production dependencies
# RUN yarn install --production
# # start server
# CMD ["node", "."]
