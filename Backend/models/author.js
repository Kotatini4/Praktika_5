const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Author = db.define(
    "author",
    {
        authorId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "author_id",
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "last_name",
        },
        lastUpdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "last_update",
        },
    },
    {
        timestamps: false,
        tableName: "authors",
        indexes: [
            {
                name: "idx_author_last_name",
                using: "BTREE",
                fields: [{ name: "last_name" }],
            },
        ],
    }
);
module.exports = Author;
