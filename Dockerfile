FROM --platform=$BUILDPLATFORM node:20.5.1-bullseye-slim@sha256:f54a16be368537403c6f20e6e9cfa400f4b71c71ae9e1e93558b33a08f109db6 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.5.1-bullseye-slim@sha256:f54a16be368537403c6f20e6e9cfa400f4b71c71ae9e1e93558b33a08f109db6 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.5.1-bullseye-slim@sha256:f54a16be368537403c6f20e6e9cfa400f4b71c71ae9e1e93558b33a08f109db6 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
