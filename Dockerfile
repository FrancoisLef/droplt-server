###
# Builder
###
FROM node:16 as builder

WORKDIR /builder

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

COPY . ./

# RUN yarn generate
RUN yarn build
RUN yarn deploy

###
# Runner
###
FROM node:16 as runner

WORKDIR /runner

ENV NODE_ENV=production
ENV GOOGLE_APPLICATION_CREDENTIALS=/firebase.json

COPY --from=builder /builder/node_modules ./node_modules/
COPY --from=builder /builder/database ./database/
COPY --from=builder /builder/prisma ./prisma/
COPY --from=builder /builder/public ./public/
COPY --from=builder /builder/dist ./dist/

EXPOSE 4000

CMD ["node", "./dist"]
