FROM --platform=$BUILDPLATFORM node:20.4.0-bullseye-slim@sha256:77360666adb6622d13d0f32786185b7ddc5e5cd4a9c4140097ee7fdd9b3db527 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.4.0-bullseye-slim@sha256:77360666adb6622d13d0f32786185b7ddc5e5cd4a9c4140097ee7fdd9b3db527 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.4.0-bullseye-slim@sha256:77360666adb6622d13d0f32786185b7ddc5e5cd4a9c4140097ee7fdd9b3db527 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
