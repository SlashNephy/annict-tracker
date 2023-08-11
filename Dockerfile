FROM --platform=$BUILDPLATFORM node:20.5.1-bullseye-slim@sha256:a2fe8fd3975d4b378abf721519df7cf0d465b8b8fb29e6bbe4d4a79c871bcded AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.5.1-bullseye-slim@sha256:a2fe8fd3975d4b378abf721519df7cf0d465b8b8fb29e6bbe4d4a79c871bcded AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.5.1-bullseye-slim@sha256:a2fe8fd3975d4b378abf721519df7cf0d465b8b8fb29e6bbe4d4a79c871bcded AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
