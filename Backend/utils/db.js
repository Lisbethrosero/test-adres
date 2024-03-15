var typeorm = require("typeorm");
require('dotenv').config();

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: true,
    entities: [
    require("./../entities/Users"), 
    require("./../entities/Budgets"), 
    require("./../entities/History"),
    require("./../entities/Suppliers"),
    require("./../entities/Units"),
    require("./../entities/Type")
    ]
})

module.exports = dataSource;