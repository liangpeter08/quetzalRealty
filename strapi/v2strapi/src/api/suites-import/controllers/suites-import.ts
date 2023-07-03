/**
 * A set of functions called "actions" for `suites-import`
 */
const fs = require('fs');

const schema = ['marketing_suite_number', 'legal_suite_number', 'current_price']
export default {
  exampleAction: async (ctx, next) => {
    try {
      const csvData = fs.readFileSync(ctx.request.files.file.path, 'utf8')

      const result = [];
      const data = csvData.split('\n');
      data.splice(0, 1);
      // TODO: error checking

      for (const line of data) {
        const row = line.split(',')
        let newEntry = {}
        for (let i = 0; i < schema.length; i++) {
          newEntry[schema[i]] = row[i]
        }
        console.log(row);
        console.log(newEntry);
        newEntry['state'] = 'published'
        newEntry['publishedAt'] = Date.now();
        result.push(newEntry)
      }

      const importService = strapi.plugin("import-export-entries").service("import");
      console.log('result', result);
      const res = await importService.importData(
        result, { slug: "api::suite.suite", format: "jso", idField: "marketing_suite_number", user: 123 })
      ctx.body = res

    } catch (err) {
      ctx.body = err;
    }
  }
};
