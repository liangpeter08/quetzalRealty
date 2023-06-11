module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/broker-allocation',
      handler: 'broker.brokerAllocationSummary',
    }
  ]
}