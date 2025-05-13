const db = require("./database");
const { Book, Author, Category, Comment, User, Role } = require("../models");

async function setupDatabase() {
    try {
        // 1. Синхронизация моделей с БД
        await db.sync({ force: true });
        console.log("Таблицы успешно созданы");

        console.log(
            "Структура базы данных настроена. Теперь можно запускать seed.js для заполнения данными."
        );
        process.exit(0);
    } catch (error) {
        console.error("Ошибка при создании таблиц:", error);
        process.exit(1);
    }
}

setupDatabase();
