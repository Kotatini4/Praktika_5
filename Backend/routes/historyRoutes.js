const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authjwt");
const historyController = require("../controllers/historyСontroller");

/**
 * @swagger
 * /history:
 *   get:
 *     tags:
 *       - История
 *     summary: Получить историю действий
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: Админ "admin" создал книгу "ААА"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-05-13T19:02:56.280Z
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Требуется роль admin
 */
router.get(
    "/history",
    verifyToken,
    isAdmin,
    // #swagger.tags = ['History']
    // #swagger.description = 'Получить список всех действий из таблицы истории'
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.responses[200] = {
    //     description: 'Список действий',
    //     schema: [
    //         { id: 1, description: "Пользователь admin создал книгу", date: "2025-05-14T10:00:00.000Z" }
    //     ]
    // }
    // #swagger.responses[403] = { description: 'Только для админа' }
    historyController.getAllHistory
);

module.exports = router;
