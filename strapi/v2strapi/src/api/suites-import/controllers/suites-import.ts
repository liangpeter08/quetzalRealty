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
          "api::suites:suites": {
            "1": {
              "id": 1,
              "exposure": "North",
              "legal_suite_number": "101",
              "marketing_suite_number": "101",
              "createdAt": "2023-06-06T01:13:09.839Z",
              "updatedAt": "2023-06-06T01:13:11.094Z",
              "publishedAt": "2023-06-06T01:13:11.091Z",
              "current_price": 800000,
              "approved_minimum_price": 800000,
              "unit_status": "Available",
              "allocated_broker": "Peter Liang",
              "purchaser_first_name": null,
              "purchaser_last_name": null,
              "marketing_floor": null,
              "legal_floor": null,
              "marketing_unit_number": null,
              "legal_unit_number": null
            }
          }
        }
      }, { slug: "api::suite.suite", format: 'jso', idField: 'id' })
    } catch (err) {
      ctx.body = err;
    }
  }
};
