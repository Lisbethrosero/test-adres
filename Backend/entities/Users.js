var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Users", 
    tableName: "users", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        email: {
            type: "varchar",
        },        
        password: {
            type: "varchar",
        },       
        create_at: {
            type: Date,
        },                              
    },
})
