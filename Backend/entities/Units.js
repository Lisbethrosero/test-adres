const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Units',
    tableName: 'units',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        createdAt: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
});