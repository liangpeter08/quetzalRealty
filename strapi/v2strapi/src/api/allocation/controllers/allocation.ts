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
  },
  async deleteAllocation(ctx) {
    // some custom logic here
    const { allocationId, suiteId } = ctx.request.body
    const suite = await strapi.entityService.findOne('api::suite.suite', suiteId, {
      fields: ['unit_status']
    })

    const allocation = await strapi.entityService.findOne('api::allocation.allocation', allocationId, {
      fields: []
    })

    // error checking
    if (!suite) {
      return ctx.badRequest('cannot find suite', { suiteId })
    } else if (!allocation) {
      return ctx.badRequest('cannot find allocation', { allocationId })
    }

    ctx.body = 'okay'

    await strapi.db.transaction(async ({ onCommit, onRollback }) => {
      const result = await strapi.entityService.update('api::allocation.allocation', allocationId, {
        data: {
          status: 'Revoked',
        }
      });
      await strapi.entityService.update('api::suite.suite', suiteId, {
        data: {
          'unit_status': 'Available',
          broker: null,
        }
      })

      onCommit(() => {
        ctx.body = result
      })

      onRollback(() => {
        ctx.badRequest('failed to delete allocation', ctx.request.body)
      })
    });
  }
})

);
