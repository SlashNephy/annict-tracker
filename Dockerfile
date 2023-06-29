FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:115459129ed17d1c8c4a7911e7a3756c8e49b9d89e3eac48f34249578c9971ef AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:115459129ed17d1c8c4a7911e7a3756c8e49b9d89e3eac48f34249578c9971ef AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.3.1-bullseye-slim@sha256:115459129ed17d1c8c4a7911e7a3756c8e49b9d89e3eac48f34249578c9971ef AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
