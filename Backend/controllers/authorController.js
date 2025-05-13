const Author = require("../models/author");

exports.createAuthor = async (req, res) => {
    const { first_name, last_name } = req.body;

    // Валидация входных данных
    if (!first_name || !last_name) {
        return res.status(400).json({
            message: "Имя и фамилия автора обязательны для заполнения",
        });
    }

    try {
        // Проверка на существующего автора
        const existingAuthor = await Author.findOne({
            where: {
                firstName: first_name,
                lastName: last_name,
            },
        });

        if (existingAuthor) {
            return res.status(409).json({
                message: "Автор с таким именем и фамилией уже существует",
                author: existingAuthor,
            });
        }

        // Создание нового автора (изменил название переменной с Author на newAuthor)
        const newAuthor = await Author.create({
            firstName: first_name,
            lastName: last_name,
        });

        return res.status(201).json({
            success: true,
            message: "Автор успешно создан",
            author: newAuthor,
        });
    } catch (error) {
        console.error("Ошибка при создании автора:", error);
        return res.status(500).json({
            success: false,
            message: "Произошла ошибка при создании автора",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Author.destroy({
            where: { authorId: id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Автор не найден" });
        }

        res.status(200).json({ message: "Автор удалён" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении автора" });
    }
};

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        res.status(500).json({
            message: "Error fetching authors",
            error: error.message,
        });
    }
};

exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: "Автор не найден" });
        }

        await author.update({
            firstName: first_name,
            lastName: last_name,
        });

        res.status(200).json(author);
    } catch (error) {
        console.error("Ошибка при обновлении автора:", error);
        res.status(500).json({ message: "Ошибка при обновлении автора" });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: "Автор не найден" });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error("Ошибка при получении автора:", error);
        res.status(500).json({ message: "Ошибка при получении автора" });
    }
};
