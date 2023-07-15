/**
 * broker controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::broker.broker', ({ strapi }) => ({
  async brokerAllocationSummary(ctx) {
    try {
      const broker = await strapi.service('api::broker.broker').find({
        ...ctx,
        populate: {
          allocations: { count: true }
        }
      });
      ctx.body = broker
    } catch (e) {
      ctx.body = 'error'
    }
  },
  async brokerSuites(ctx) {
    const { brokerId } = ctx.query
    try {
      const broker = await strapi.service('api::broker.broker').findOne(brokerId, {
        ...ctx,
        populate: {
          allocations: {
            filters: {
              $and: [
                { status: 'Active' }
              ]
            },
            populate: {
              suite: true
            }
          }
        }
      });
      ctx.body = broker
    } catch (e) {
      ctx.body = 'error'
    }
  }
}));
