FROM node:12.13.0-alpine

# Python needed to install certain binaries (bcrypt, for instance)
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN mkdir -p /app
RUN mkdir -p /app/config

COPY package.json /app
COPY yarn.lock /app
COPY nuxt.config.js /app
COPY .contentful.json /app
COPY config/default.json5 /app/config
COPY config/production.json5 /app/config

# Copy source code/libs
COPY .nuxt /app/.nuxt

# cd into app directory
WORKDIR /app

# Install dependencies
RUN yarn install --production=true

# Http Port
EXPOSE 3002

CMD ["node", ".nuxt/server/index.js"]
