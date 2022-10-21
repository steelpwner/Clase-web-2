const env = require("dotenv")

env.config()

const configuracion = {
    appPort: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

module.exports = configuracion