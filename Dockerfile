FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:b25b07f3ca6776d74de5b3d7aadafd3a6fb561576aabee46d6da9dfab94a6372 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:b25b07f3ca6776d74de5b3d7aadafd3a6fb561576aabee46d6da9dfab94a6372 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.3.1-bullseye-slim@sha256:b25b07f3ca6776d74de5b3d7aadafd3a6fb561576aabee46d6da9dfab94a6372 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
