const { DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.define(
    "history",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "history",
        timestamps: false,
        schema: "books",
    }
);

module.exports = History;
