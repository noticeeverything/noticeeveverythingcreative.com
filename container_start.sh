#!/usr/bin/env bash

TAG="" # optional - defaults to "latest" - docker image tag to pull
REPO="186723156933.dkr.ecr.us-west-2.amazonaws.com/applications/noticeeverythingcreative.com"

# Loop provided arguments and set local variables
for i in "$@"; do
  case ${i} in
  -t=* | --tag=*)
    TAG="${i#*=}"
    shift
    ;;
  -e=* | --env=*)
    ENV="${i#*=}"
    shift
    ;;
  --default)
    DEFAULT=YES
    shift
    ;;
  *) ;;
  esac
done

if [[ -z "${TAG}" ]]; then
  TAG="latest"
fi

# Our AWS ECR repo for this app
CONTAINER_NAME="noticeeverythingcreative_com"

# Login in to ECR
LOGIN="$(aws ecr get-login --no-include-email)"
${LOGIN}

# Pull image
docker pull ${REPO}:${TAG}

# Stop/remove running containers
docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}
TAG=${TAG} docker-compose up -d
