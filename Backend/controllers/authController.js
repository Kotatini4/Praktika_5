const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, Role } = require("../models");

// Регистрация пользователя
exports.signup = async (req, res) => {
    // Валидация (не забудьте настроить middleware валидации)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // Пароль будет хеширован хуком beforeCreate в модели User
        });
        // По умолчанию назначаем роль "user" (предполагаем, что ID роли "user" = 2)
        const userRole = await Role.findOne({ where: { name: "user" } });
        if (userRole) {
            await user.setRole(userRole);
        }
        res.send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Вход пользователя
exports.signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
            include: [
                {
                    model: Role,
                    as: "role",
                },
            ],
        });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        const token = jwt.sign(
            { userId: user.id },
            process.env.SECRET_ACCESS_TOKEN,
            {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            }
        );
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token,
            tokenType: "Bearer",
            expiresIn: 86400,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Role,
                as: "role",
                attributes: ["name"],
            },
            attributes: { exclude: ["password"] },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка при получении пользователей",
            error: error.message,
        });
    }
};

exports.updateUserRole = async (req, res) => {
    const { userId, roleName } = req.body;
    try {
        const user = await User.findByPk(userId);
        const role = await Role.findOne({ where: { name: roleName } });

        if (!user || !role) {
            return res
                .status(404)
                .json({ message: "Пользователь или роль не найдены" });
        }

        await user.setRole(role);
        res.status(200).json({ message: `Роль обновлена на ${role.name}` });
    } catch (error) {
        res.status(500).json({
            message: "Ошибка обновления роли",
            error: error.message,
        });
    }
};
