/**
 * A set of functions called "actions" for `suites-import`
 */

const importService = strapi.plugin("import-export-entries").service("import");
export default {
  exampleAction: async (ctx, next) => {
    const body = "{\n\t\"version\": 2,\n\t\"data\": {\n\t\t\"api::suite.suite\": {\n\t\t\t\"1\": {\n\t\t\t\t\"id\": 1,\n\t\t\t\t\"exposure\": \"West\",\n\t\t\t\t\"legal_suite_number\": \"102\",\n\t\t\t\t\"marketing_suite_number\": \"102\",\n\t\t\t\t\"createdAt\": \"2023-05-28T20:29:57.728Z\",\n\t\t\t\t\"updatedAt\": \"2023-06-06T01:13:44.382Z\",\n\t\t\t\t\"publishedAt\": \"2023-05-28T20:30:02.489Z\",\n\t\t\t\t\"current_price\": 10000,\n\t\t\t\t\"approved_minimum_price\": 800000,\n\t\t\t\t\"unit_status\": null,\n\t\t\t\t\"allocated_broker\": null,\n\t\t\t\t\"purchaser_first_name\": null,\n\t\t\t\t\"purchaser_last_name\": null,\n\t\t\t\t\"marketing_floor\": null,\n\t\t\t\t\"legal_floor\": null,\n\t\t\t\t\"marketing_unit_number\": null,\n\t\t\t\t\"legal_unit_number\": null,\n\t\t\t\t\"model\": 34,\n\t\t\t\t\"createdBy\": null,\n\t\t\t\t\"updatedBy\": null\n\t\t\t}\n\t\t}\n\t}\n}"
    try {
      ctx.body = await importService.importService(body, { slug: "api::suite.suite", format: 'json', idField: 'id' })
    } catch (err) {
      ctx.body = err;
    }
  }
};
