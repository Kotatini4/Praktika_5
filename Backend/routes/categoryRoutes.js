const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authJwt = require("../middleware/authjwt");

router.post(
    "/categories",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Categories']
     #swagger.description = 'Создать категорию (только админ)'
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             name: 'Фантастика'
         }
     }
     #swagger.responses[201] = {
         description: 'Категория создана'
     }
     #swagger.responses[409] = {
         description: 'Категория уже существует'
     }
  */
    categoryController.createCategory
);

router.get(
    "/categories",
    /* #swagger.tags = ['Categories']
     #swagger.description = 'Получить все категории'
     #swagger.responses[200] = {
         description: 'Список категорий'
     }
  */
    categoryController.getAllCategories
);

router.get(
    "/categories/:id",
    /* #swagger.tags = ['Categories']
     #swagger.description = 'Получить категорию по ID'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Категория найдена'
     }
     #swagger.responses[404] = {
         description: 'Не найдено'
     }
  */
    categoryController.getCategoryById
);

router.put(
    "/categories/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Categories']
     #swagger.description = 'Обновить категорию (только админ)'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
             name: 'Научная литература'
         }
     }
     #swagger.responses[200] = {
         description: 'Категория обновлена'
     }
  */
    categoryController.updateCategory
);

router.delete(
    "/categories/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    /* #swagger.tags = ['Categories']
     #swagger.description = 'Удалить категорию (только админ)'
     #swagger.parameters['id'] = {
         in: 'path',
         required: true,
         type: 'integer'
     }
     #swagger.responses[204] = {
         description: 'Успешное удаление'
     }
  */
    categoryController.deleteCategory
);

module.exports = router;
