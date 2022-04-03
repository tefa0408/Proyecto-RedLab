const {Pool} = require('pg')

const pool=new Pool({
    user : 'postgres',
    password : 'tefa0408',
    host: 'localhost',
    port: 5432,
    database: 'labdb'
})

module.exports = pool;