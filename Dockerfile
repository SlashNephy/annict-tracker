FROM --platform=$BUILDPLATFORM node:20.2.0-bullseye-slim@sha256:5138ded35380c7e55b7898a5c3666009334aa4af416571060d37347242e1812f AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.2.0-bullseye-slim@sha256:5138ded35380c7e55b7898a5c3666009334aa4af416571060d37347242e1812f AS build
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
ENV DOCKER=1
RUN yarn build

FROM --platform=$TARGETPLATFORM node:20.2.0-bullseye-slim@sha256:5138ded35380c7e55b7898a5c3666009334aa4af416571060d37347242e1812f AS runtime
WORKDIR /app
ENV NODE_ENV="production"
ENV PORT=3000
USER node

COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
