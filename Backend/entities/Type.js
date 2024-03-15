const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Type',
    tableName: 'type',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        create_at: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
});