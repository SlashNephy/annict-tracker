FROM --platform=$BUILDPLATFORM node:20.1.0-bullseye-slim@sha256:bc5812b018fa74ea7dbe759cb6c0b456ff96a5c2bc8765e132438f6a75cd6946 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.1.0-bullseye-slim@sha256:bc5812b018fa74ea7dbe759cb6c0b456ff96a5c2bc8765e132438f6a75cd6946 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.1.0-bullseye-slim@sha256:bc5812b018fa74ea7dbe759cb6c0b456ff96a5c2bc8765e132438f6a75cd6946 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
