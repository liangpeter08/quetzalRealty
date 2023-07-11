module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/broker-allocation',
      handler: 'broker.brokerAllocationSummary',
    },
    {
      method: 'GET',
      path: '/broker-suites',
      handler: 'broker.brokerSuites',
    },
  ]
}