/**
 * allocation controller
 */

import { factories } from '@strapi/strapi'

interface CreateContext {

}

export default factories.createCoreController('api::allocation.allocation', ({ strapi }) => ({
  async create(ctx) {
    // some custom logic here
    const { brokerId, suiteId } = ctx.request.body
    const suite = await strapi.entityService.findOne('api::suite.suite', suiteId, {
      fields: ['current_price']
    })

    // error checking
    if (!suite) {
      return ctx.badRequest('cannot find suite', { suiteId })
    }

    const broker = await strapi.entityService.findOne('api::broker.broker', brokerId, {
      fields: []
    })

    // error checking
    if (!broker) {
      return ctx.badRequest('cannot find broker', { broker })
    }

    await strapi.db.transaction(async ({ onCommit, onRollback }) => {

      const result = await strapi.entityService.create('api::allocation.allocation', {
        data: {
          broker,
          suite,
          status: 'Active',
          "transaction_status": "Pending",
          publishedAt: Date.now(),
        }
      });

      await strapi.entityService.create('api::transaction.transaction', {
        data: {
          allocation: result.id,
          status: 'Pending',
          publishedAt: Date.now()
        }
      })

      await strapi.entityService.update('api::suite.suite', suiteId, {
        data: {
          'unit_status': 'Allocated',
          broker,
        }
      })

      onCommit(() => {
        ctx.body = result
      })

      onRollback(() => {
        ctx.badRequest('failed to allocation', ctx.request.body)
      })
    });
  }
})

);
