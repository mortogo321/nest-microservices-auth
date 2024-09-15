ARG IMAGE=node:alpine

FROM ${IMAGE} AS builder

WORKDIR /app

COPY . .

RUN yarn global add @nestjs/cli
RUN yarn

FROM builder AS dev

CMD [ "" ]

FROM ${IMAGE} AS prod

USER node

WORKDIR /app

COPY --from=builder /app/dist /app/dist

CMD [ "" ]
