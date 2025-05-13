const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Comment = db.define(
    "comment",
    {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "book_id",
        },
    },
    { tableName: "comments" }
);

module.exports = Comment;
