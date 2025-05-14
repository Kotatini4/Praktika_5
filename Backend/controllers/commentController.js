const { Comment, User, Book } = require("../models");
const asyncHandler = require("express-async-handler");
const { logHistory } = require('../utils/historyLogger');
// POST new comment
exports.createComment = asyncHandler(async (req, res) => {
    const userId = req.userId; // получен из verifyToken
    const bookId = req.params.bookId;
    const { body } = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            message: "Текст комментария обязателен.",
        });
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Пользователь не найден.",
        });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Книга не найдена.",
        });
    }

    const comment = await Comment.create({
        body,
        user_id: userId,
        book_id: bookId,
    });

    const populatedComment = await Comment.findByPk(comment.id, {
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'username'],
            }
        ]
    });

    await logHistory(`Пользователь "${req.user.username}" оставил комментарий к книге "${book.book_title}"`);

    res.status(201).json({
        success: true,
        data: populatedComment,
        message: "Комментарий успешно создан.",
    });
});



// GET all comments for a specific book
exports.getAllCommentsForBook = asyncHandler(async (req, res) => {
    const { bookId } = req.params;

    const bookExists = await Book.findByPk(bookId);
    if (!bookExists) {
        return res
            .status(404)
            .json({ success: false, message: "Книга не найдена." });
    }

    const comments = await Comment.findAll({
        where: { book_id: bookId },
        include: [{ model: User, attributes: ["id", "username"] }],
        order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: comments });
});

// GET comment by ID
exports.getCommentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
        include: [{ model: User, attributes: ["id", "username"] }],
    });

    if (!comment) {
        return res
            .status(404)
            .json({ success: false, message: "Комментарий не найден." });
    }

    res.status(200).json({ success: true, data: comment });
});

// PUT update comment
exports.updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { body, userId } = req.body; // Временно разрешаем менять userId (для тестирования)

    const comment = await Comment.findByPk(id);
    if (!comment) {
        return res
            .status(404)
            .json({ success: false, message: "Комментарий не найден." });
    }

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                message:
                    "Текст комментария не может быть пустым для обновления.",
            });
    }

    const updatedData = { body };
    if (userId) {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Пользователь с указанным ID не найден.",
                });
        }
        updatedData.user_id = userId;
    }

    await comment.update(updatedData);

    const updatedComment = await Comment.findByPk(id, {
        include: [{ model: User, attributes: ["id", "username"] }],
    });

    await logHistory(`Пользователь "${req.user.username}" отредактировал комментарий (id: ${comment.id})`);

    res.status(200).json({
        success: true,
        data: updatedComment,
        message: "Комментарий успешно обновлен.",
    });
});

// DELETE comment
exports.deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment) {
        return res
            .status(404)
            .json({ success: false, message: "Комментарий не найден." });
    }

    await logHistory(`Пользователь "${req.user.username}" удалил комментарий (id: ${comment.id})`);

    await comment.destroy();

    res.status(204).end();
});
