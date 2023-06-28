FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:00873eee0d287619672ccd368f32fa191ba43837f08d8d2dd8573b1311ed5273 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.3.1-bullseye-slim@sha256:00873eee0d287619672ccd368f32fa191ba43837f08d8d2dd8573b1311ed5273 AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.3.1-bullseye-slim@sha256:00873eee0d287619672ccd368f32fa191ba43837f08d8d2dd8573b1311ed5273 AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
