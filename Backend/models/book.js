const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Book = db.define(
    "book",
    {
        bookId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "book_id",
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "book_title",
        },
        description: {
            type: DataTypes.TEXT,
            field: "book_description",
        },
        publicationYear: {
            type: DataTypes.INTEGER,
            field: "publication_year",
        },
        category_id: {
            type: DataTypes.INTEGER,
            field: "category_id",
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
        schema: "books",
        tableName: "books",
        indexes: [
            {
                name: "idx_book_title",
                using: "BTREE",
                fields: [{ name: "book_title" }],
            },
        ],
    }
);
module.exports = Book;
