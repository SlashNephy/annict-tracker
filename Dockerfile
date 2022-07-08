FROM --platform=$BUILDPLATFORM node:16.16.0-bullseye AS build

WORKDIR /app
COPY ./ /app/

RUN yarn install --immutable && \
    yarn setup && \
    yarn webpack

FROM --platform=$TARGETPLATFORM node:16.16.0-bullseye-slim

WORKDIR /app
USER node

COPY --from=build /app/dist/*.bundle.js /app/dist/
COPY --from=build /app/package.json /app/

ENTRYPOINT ["node"]
CMD ["dist/app.bundle.js"]
