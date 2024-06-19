require('dotenv').config()

const {
  DB_USERNAME,
  DB_HOSTNAME,
  DB_DIALECT,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": 'mysql'
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": 'mysql'
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": 'mysql',
    "port": DB_PORT || 3306,
    "pool": {
      "max" : 5 ,
      "min" : 0 ,
      "acquire" : 30000 ,
      "idle" : 10000 
    }
  }
}
