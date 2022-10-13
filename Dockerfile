FROM --platform=linux/amd64 node:16 as dependencies
WORKDIR /dtp-sales-bot
COPY package.json yarn.lock .env ./
RUN yarn install --frozen-lockfile

FROM --platform=linux/amd64 node:16 as builder
WORKDIR /dtp-sales-bot
COPY . .
COPY --from=dependencies /dtp-sales-bot/node_modules ./node_modules
COPY --from=dependencies /dtp-sales-bot/.env ./.env
RUN yarn build

FROM --platform=linux/amd64 node:16 as runner
WORKDIR /dtp-sales-bot
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /dtp-sales-bot/next.config.js ./
COPY --from=builder /dtp-sales-bot/dist ./dist
COPY --from=builder /dtp-sales-bot/node_modules ./node_modules
COPY --from=builder /dtp-sales-bot/package.json ./package.json
COPY --from=builder /dtp-sales-bot/.env ./.env

EXPOSE 4000
CMD ["yarn", "start"]
