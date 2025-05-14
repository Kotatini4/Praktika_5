const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(403).send({ message: "Нет токена" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

        const user = await User.findByPk(decoded.userId, { include: "role" });
        if (!user) return res.status(404).send({ message: "Пользователь не найден" });

        req.user = user; // ✅ вот это добавь
        req.userId = user.id; // (можешь оставить, если где-то используется)

        next();
    } catch {
        return res.status(401).send({ message: "Невалидный токен" });
    }
};


const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userId, { include: "role" });
    if (user?.role?.name === "admin") return next();
    return res.status(403).send({ message: "Требуется роль admin" });
};

const isUserOrAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userId, { include: "role" });
    if (user?.role?.name === "admin" || user?.role?.name === "user")
        return next();
    return res.status(403).send({ message: "Доступ запрещён" });
};

module.exports = {
    verifyToken,
    isAdmin,
    isUserOrAdmin,
};
