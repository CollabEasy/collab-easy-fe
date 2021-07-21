FROM node:lts as dependencies
WORKDIR /collab-easy-fe
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /collab-easy-fe
COPY . .
COPY --from=dependencies /collab-easy-fe/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /collab-easy-fe
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /collab-easy-fe/public ./public
COPY --from=builder /collab-easy-fe/.next ./.next
COPY --from=builder /collab-easy-fe/node_modules ./node_modules
COPY --from=builder /collab-easy-fe/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]