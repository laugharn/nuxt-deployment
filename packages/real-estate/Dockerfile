FROM mhart/alpine-node:10
RUN apk add git
WORKDIR /usr/src
ARG NOW_URL
ENV NODE_ENV production
ENV ENV_FILE=dev
COPY package.json /usr/src/
RUN yarn install
COPY . .
RUN yarn generate
RUN mv ./dist /public
