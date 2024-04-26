function createEndpointsGenerator(endpointFactories) {
  return function createEndpoints(builder) {
    const endpoints = {
      ...endpointFactories,
    };
    for (const [key, fn] of Object.entries(endpoints)) {
      endpoints[key] = fn(builder);
    }
    return endpoints;
  };
}

export default createEndpointsGenerator;
