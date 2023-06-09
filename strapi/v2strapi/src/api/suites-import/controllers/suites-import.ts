/**
 * A set of functions called "actions" for `suites-import`
 */
const fs = require('fs');

export default {
  exampleAction: async (ctx, next) => {
    try {
      const csvData = fs.readFileSync(ctx.request.files.file.path, 'utf8')
      console.log('csv', csvData);

      const body = ctx.request.body
      const { data, slug, format, idField } = body;
      const importService = strapi.plugin("import-export-entries").service("import");
      const res = await importService.importData(
        data, { slug, format, idField })

      ctx.body = res

    } catch (err) {
      ctx.body = err;
    }
  }
};
