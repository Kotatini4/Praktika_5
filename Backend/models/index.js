const Book = require("./book");
const Author = require("./author");
const Category = require("./category");
const Comment = require("./comment");
const User = require("./user");
const Role = require("./role");
const History = require("./history"); // ✅ добавлено History

Book.belongsToMany(Author, {
    through: "book_author",
    foreignKey: "book_id",
    timestamps: false,
});

Author.belongsToMany(Book, {
    through: "book_author",
    foreignKey: "author_id",
    onDelete: "CASCADE",
});

Book.belongsTo(Category, { as: "category", foreignKey: "category_id" });
Category.hasMany(Book, { foreignKey: "category_id", onDelete: "CASCADE" });

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

Book.hasMany(Comment, {
    as: "comments",
    foreignKey: "book_id",
});
Comment.belongsTo(Book, { as: "book", foreignKey: "book_id" });

Role.hasMany(User, {
    foreignKey: "role_id",
    onDelete: "CASCADE",
});
User.belongsTo(Role, { as: "role", foreignKey: "role_id" });

const models = {
    Book: Book,
    Author: Author,
    Category: Category,
    Comment: Comment,
    User: User,
    Role: Role,
    History: History, // ✅ добавлено сюда тоже
};

module.exports = models;
