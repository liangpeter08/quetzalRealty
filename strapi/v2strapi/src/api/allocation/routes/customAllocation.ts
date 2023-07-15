module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/delete-allocation',
      handler: 'allocation.deleteAllocation',
    },
  ]
}