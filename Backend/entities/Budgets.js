var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Butgets", 
    tableName: "butgets", 
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
            type: "int",
            width: 50, 
        },  
        cant: {
            type: "int",
            width: 11, 
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
        state: {
            type: "varchar",
        }, 
        date: {
            type: Date,
        },                                             
        create_at: {
            type: Date,
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
