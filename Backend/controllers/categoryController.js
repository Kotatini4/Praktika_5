const { Category } = require("../models");

// Создать категорию
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Название категории обязательно",
            });
        }

        const existing = await Category.findOne({ where: { name } });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Категория с таким названием уже существует",
            });
        }

        const category = await Category.create({ name });

        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("Ошибка при создании категории:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при создании категории",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

// Получить все категории
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["category_id", "ASC"]],
        });

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при получении категорий",
        });
    }
};

// Получить категорию по ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Категория не найдена",
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("Ошибка при получении категории:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при получении категории",
        });
    }
};

// Обновить категорию
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Категория не найдена",
            });
        }

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Название категории обязательно",
            });
        }

        await category.update({ name });

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("Ошибка при обновлении категории:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при обновлении категории",
        });
    }
};

// Удалить категорию
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Категория не найдена",
            });
        }

        await category.destroy();

        res.status(204).end();
    } catch (error) {
        console.error("Ошибка при удалении категории:", error);
        res.status(500).json({
            success: false,
            message: "Ошибка при удалении категории",
        });
    }
};
