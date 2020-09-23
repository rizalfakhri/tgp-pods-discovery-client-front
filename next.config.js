module.exports = {
  env: {
    PODS_DISCOVERY_SERVICE_ENDPOINT: (process.env.NODE_ENV == 'production') ? process.env.PODS_DISCOVERY_SERVICE_ENDPOINT_PROD : process.env.PODS_DISCOVERY_SERVICE_ENDPOINT_DEV
  }
}
