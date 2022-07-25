require('dotenv').config()

module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username:process.env.DB_USER, 
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE, 
    define:{
        timespamps: true,
        underscored: true,
        underscoredAll: true,
    },
}