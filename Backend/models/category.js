const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Category = db.define(
    "category",
    {
        categoryId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "category_id",
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "name",
        },
    },
    {
        timestamps: false,
        tableName: "categories",
        indexes: [
            {
                name: "idx_category_name",
                using: "BTREE",
                fields: [{ name: "name" }],
            },
        ],
    }
);
module.exports = Category;
