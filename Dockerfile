FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:d634f3f7fd569adf841b8a8f73ad04a757ca7bbaf4b3c4c1163dcac3c064d3a5 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:d634f3f7fd569adf841b8a8f73ad04a757ca7bbaf4b3c4c1163dcac3c064d3a5 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.3.1-bullseye-slim@sha256:d634f3f7fd569adf841b8a8f73ad04a757ca7bbaf4b3c4c1163dcac3c064d3a5 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
