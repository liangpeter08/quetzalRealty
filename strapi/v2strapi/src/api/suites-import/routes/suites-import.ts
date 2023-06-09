export default {
  routes: [
    {
      method: 'GET',
      path: '/suites-import',
      handler: 'suites-import.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
