const username = process.env.NODE_DB_USERNAME
const password = process.env.NODE_DB_PASSWORD
const database = process.env.NODE_DB_DATABASE
const host = process.env.NODE_DB_HOST
const dialect = process.env.NODE_DB_DIALECT

module.exports = {
    dev: {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect
      },
      test: {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect
      },
      prod: {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect
      }
}