const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const authJwt = require("../middleware/authjwt");

router.post(
    "/authors",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Создать нового автора (только админ)'
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             first_name: 'Иван',
             last_name: 'Петров'
         }
     }
     #swagger.responses[201] = {
         description: 'Автор успешно создан'
     }
     #swagger.responses[400] = {
         description: 'Неверные данные'
     }
  */
    authorController.createAuthor
);

router.get(
    "/authors",
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Получить всех авторов'
     #swagger.responses[200] = {
         description: 'Список авторов'
     }
  */
    authorController.getAllAuthors
);

router.get(
    "/authors/:id",
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Получить автора по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Автор найден'
     }
     #swagger.responses[404] = {
         description: 'Автор не найден'
     }
  */
    authorController.getAuthorById
);

router.put(
    "/authors/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Обновить автора по ID (только админ)'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             first_name: 'Иван',
             last_name: 'Петров'
         }
     }
     #swagger.responses[200] = {
         description: 'Автор обновлён'
     }
     #swagger.responses[404] = {
         description: 'Автор не найден'
     }
  */
    authorController.updateAuthor
);

router.delete(
    "/authors/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Authors']
     #swagger.description = 'Удалить автора (только админ)'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Автор удалён'
     }
     #swagger.responses[404] = {
         description: 'Автор не найден'
     }
     */
    authorController.deleteAuthor
);

module.exports = router;
