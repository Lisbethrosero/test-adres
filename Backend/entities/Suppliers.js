var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Suppliers", 
    tableName: "suppliers", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },     
        create_at: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
        },                              
    },
})
