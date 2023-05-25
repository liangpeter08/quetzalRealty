const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

async function setup() {
    console.log('started')
    const db = await sqlite.open({filename: '/tmp/database.db', driver: sqlite3.Database})
    console.log('migrate')
    await db.migrate({migrationsPath: './migrations',force: 'last'})
    const result = await db.all('SELECT * FROM PersonTest')


    console.log(JSON.stringify(result))
}
setup()