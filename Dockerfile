FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:c92280d8fb6e7ca07f258c45e9f18cb643ea798a5441855a05e982cfd2b90789 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:c92280d8fb6e7ca07f258c45e9f18cb643ea798a5441855a05e982cfd2b90789 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.3.1-bullseye-slim@sha256:c92280d8fb6e7ca07f258c45e9f18cb643ea798a5441855a05e982cfd2b90789 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
