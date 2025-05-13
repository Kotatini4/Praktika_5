const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authJwt = require("../middleware/authjwt");
const { body } = require("express-validator");

// Регистрация пользователя
router.post(
    "/auth/signup",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    /* #swagger.tags = ['Auth']
       #swagger.description = 'Регистрация нового пользователя'
       #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               username: 'user1',
               email: 'user1@example.com',
               password: '123456'
           }
       }
       #swagger.responses[200] = {
           description: 'Пользователь зарегистрирован'
       }
       #swagger.responses[400] = {
           description: 'Ошибка валидации'
       }
    */
    authController.signup
);

// Вход пользователя
router.post(
    "/auth/signin",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    /* #swagger.tags = ['Auth']
       #swagger.description = 'Вход пользователя и получение токена'
       #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               username: 'user1',
               password: '123456'

               or

                username: 'admin',
                password: 'admin123'
           }
       }
       #swagger.responses[200] = {
           description: 'Успешный вход',
           schema: {
               accessToken: 'jwt_token_here',
               tokenType: 'Bearer',
               expiresIn: 86400
           }
       }
       #swagger.responses[401] = {
           description: 'Неверные учетные данные'
       }
    */
    authController.signin
);

router.get(
    "/users",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Users']
       #swagger.description = 'Получить список всех пользователей (только для админа)'
       #swagger.responses[200] = {
         description: 'Список пользователей',
         schema: [
           {
             id: 1,
             username: 'admin',
             email: 'admin@example.com',
             role: { name: 'admin' }
           }
         ]
       }
       #swagger.responses[403] = {
         description: 'Доступ запрещён (не админ)'
       }
     */
    authController.getAllUsers
);

router.put(
    "/users/role",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Users']
       #swagger.description = 'Смена роли пользователя (только для админа)'
       #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
           userId: 2,
           roleName: "admin"
         }
       }
       #swagger.responses[200] = {
         description: 'Роль обновлена'
       }
       #swagger.responses[404] = {
         description: 'Пользователь или роль не найдены'
       }
     */
    authController.updateUserRole
);

module.exports = router;
