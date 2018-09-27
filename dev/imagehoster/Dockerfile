FROM node:9-alpine as build-stage

WORKDIR /app

# install build dependencies
RUN apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
    bash \
    build-base \
    fftw-dev \
    git \
    make \
    python \
    vips-dev

# install application dependencies
COPY package.json yarn.lock ./
RUN JOBS=max yarn install --non-interactive --frozen-lockfile

# copy in application source
COPY . .

# run tests and build typescript sources
#RUN make lib ci-test
RUN make lib 

# prune modules
RUN yarn install --non-interactive --frozen-lockfile --production

# copy built application to runtime image
FROM node:9-alpine
WORKDIR /app
RUN apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
    fftw vips
COPY --from=build-stage /app/config config
COPY --from=build-stage /app/lib lib
COPY --from=build-stage /app/node_modules node_modules

# run in production mode
ENV NODE_ENV production
CMD [ "node", "lib/app.js" ]
