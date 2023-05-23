FROM --platform=$BUILDPLATFORM node:20.2.0-bullseye-slim@sha256:dc1906714d1993d291e1e7b5f236291236b0a0b6dfacdb164e4a9ea44d09c52e AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.2.0-bullseye-slim@sha256:dc1906714d1993d291e1e7b5f236291236b0a0b6dfacdb164e4a9ea44d09c52e AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.2.0-bullseye-slim@sha256:dc1906714d1993d291e1e7b5f236291236b0a0b6dfacdb164e4a9ea44d09c52e AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
