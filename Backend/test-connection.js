// test-connection.js
const db = require("./config/database");

async function testConnection() {
    try {
        await db.authenticate();
        console.log("✅ Подключение к PostgreSQL успешно установлено");

        // Дополнительная проверка - выполнение простого запроса
        const [result] = await db.query("SELECT version()");
        console.log("Версия PostgreSQL:", result[0].version);

        // Проверка доступности таблицы (если она существует)
        try {
            const tables = await db.query(
                "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
            );
            console.log(
                "Доступные таблицы:",
                tables[0].map((t) => t.table_name)
            );
        } catch (e) {
            console.log("Не удалось получить список таблиц:", e.message);
        }
    } catch (error) {
        console.error("❌ Ошибка подключения к PostgreSQL:", error);
    } finally {
        await db.close();
    }
}

testConnection();
