const db = require("./config/database");
const { Book, Author, Category, Comment, User, Role } = require("./models");

async function seed() {
    try {
        // Сначала подключение к базе
        await db.authenticate();
        console.log("Соединение с БД установлено");

        // Добавление ролей
        const [adminRole, userRole] = await Promise.all([
            Role.create({ name: "admin" }),
            Role.create({ name: "user" }),
        ]);

        // Пользователи
        const [admin, user1] = await Promise.all([
            User.create({
                email: "admin@example.com",
                username: "admin",
                password: "admin123",
                role_id: adminRole.id,
            }),
            User.create({
                email: "user@example.com",
                username: "user1",
                password: "user123",
                role_id: userRole.id,
            }),
        ]);

        // Категории
        const [fiction, science] = await Promise.all([
            Category.create({ name: "Фантастика" }),
            Category.create({ name: "Наука" }),
        ]);

        // Авторы
        const [tolstoy, rowling] = await Promise.all([
            Author.create({ firstName: "Лев", lastName: "Толстой" }),
            Author.create({ firstName: "Джоан", lastName: "Роулинг" }),
        ]);

        // Книги
        const book1 = await Book.create({
            title: "Война и мир",
            description: "Эпопея о русской жизни",
            publicationYear: 1869,
            category_id: fiction.categoryId,
        });

        await book1.setAuthors([tolstoy]); // связь многие-ко-многим

        const book2 = await Book.create({
            title: "Гарри Поттер",
            description: "Магический роман",
            publicationYear: 1997,
            category_id: fiction.categoryId,
        });

        await book2.setAuthors([rowling]);

        // Комментарии
        await Comment.create({
            body: "Очень интересно!",
            user_id: user1.id,
            book_id: book1.bookId,
        });

        console.log("Начальные данные успешно добавлены ✅");
        process.exit(0);
    } catch (err) {
        console.error("Ошибка при заполнении:", err);
        process.exit(1);
    }
}

seed();
