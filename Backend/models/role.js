const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

const Role = db.define(
    "role",
    {
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        tableName: "roles",
    }
);

module.exports = Role;
