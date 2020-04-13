FROM node:12.16.1-alpine

# Python needed to install certain binaries (bcrypt, for instance)
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN mkdir -p /app

COPY . /app

# cd into app directory
WORKDIR /app

# Install dependencies
RUN yarn install

# Http Port
EXPOSE 3002

RUN yarn build.prod

CMD ["yarn", "start"]
