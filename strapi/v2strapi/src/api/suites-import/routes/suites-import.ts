export default {
  routes: [
    {
      method: 'POST',
      path: '/suites-import',
      handler: 'suites-import.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
