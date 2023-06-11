/**
 * broker controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::broker.broker', ({ strapi }) => ({
  async brokerAllocationSummary(ctx) {
    try {
      const broker = await strapi.service('api::broker.broker').find(ctx);
      ctx.body = broker
    } catch (e) {
      ctx.body = 'error'
    }
  }
}));
