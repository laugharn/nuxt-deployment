FROM mhart/alpine-node:10
RUN apk add git
RUN apk add python
WORKDIR /usr/src
ARG NOW_URL
ARG ENV_FILE
ENV NODE_ENV production
COPY package.json /usr/src/
RUN yarn install
COPY . .
RUN yarn generate
RUN mv ./dist /public
