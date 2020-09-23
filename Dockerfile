# base image
FROM node:alpine

ARG PODS_DISCOVERY_SERVICE_ENDPOINT_DEV
ARG PODS_DISCOVERY_SERVICE_ENDPOINT_PROD
ENV PODS_DISCOVERY_SERVICE_ENDPOINT_DEV $PODS_DISCOVERY_SERVICE_ENDPOINT_DEV
ENV PODS_DISCOVERY_SERVICE_ENDPOINT_PROD $PODS_DISCOVERY_SERVICE_ENDPOINT_PROD

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build

EXPOSE 3000

CMD npm run start
