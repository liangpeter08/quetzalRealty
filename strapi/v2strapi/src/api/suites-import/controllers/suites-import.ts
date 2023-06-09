/**
 * A set of functions called "actions" for `suites-import`
 */

const importService = strapi.plugin("import-export-entries").service("import");
export default {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = await importService.importService({
        "version": 2,
        "data": {
          "api::suite.suite": {
            "1": {
              "id": 1,
              "exposure": "West",
              "legal_suite_number": "102",
              "marketing_suite_number": "102",
              "createdAt": "2023-05-28T20:29:57.728Z",
              "updatedAt": "2023-06-06T01:13:44.382Z",
              "publishedAt": "2023-05-28T20:30:02.489Z",
              "current_price": 815,
              "approved_minimum_price": 800000,
              "unit_status": null,
              "allocated_broker": null,
              "purchaser_first_name": null,
              "purchaser_last_name": null,
              "marketing_floor": null,
              "legal_floor": null,
              "marketing_unit_number": null,
              "legal_unit_number": null,
              "model": 34,
              "createdBy": null,
              "updatedBy": null
            },
          }
        }
      }, { slug: '12312323232323', format: 'json' })
    } catch (err) {
      ctx.body = err;
    }
  }
};
