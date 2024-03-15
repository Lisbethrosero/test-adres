var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "History", 
    tableName: "history", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        budget: {
            type: "varchar",
        },  
        val_unit: {
            type: "float",
        },  
        cant: {
            type: "int",
        },
        id_type_service: {
            type: "int",
        },  
        id_suppliers: {
            type: "int",
        }, 
        id_unit: {
            type: "int",
        },         
        documentation: {
            type: "varchar",
        }, 
        date: {
            type: Date,
        },                                             
        create_at: {
            type: Date,
        },  
        process: {
            type: "varchar",
        },
        state: {
            type: "varchar",
        },   
        lastid: {
            type: "int",
        },                                     
    },
    relations: {
        type: {
            type: "many-to-one",
            target: "Type", 
            joinColumn: { name: "id_type_service" }, 
        },
        suppliers: {
            type: "many-to-one",
            target: "Suppliers", 
            joinColumn: { name: "id_suppliers" }, 
        },
        units: {
            type: "many-to-one",
            target: "Units", 
            joinColumn: { name: "id_unit" }, 
        },
    },
})
