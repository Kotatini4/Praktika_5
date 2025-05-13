![TalTech Logo](images/tal-tech.png)

# TALLINNA TEHNIKAÜLIKOOL

### INSENERITEADUSKOND

**Virumaa kolledž**  
**RAM0541 Veebiprogrammeerimine** _(N. Ivleva)_

## 📚 Проект: REST API — Блог о книгах

### **Используемые технологии**

-   **Node.js** — среда выполнения JavaScript
-   **Express.js** — фреймворк для создания REST API
-   **Sequelize** — ORM для работы с PostgreSQL
-   **PostgreSQL** — реляционная база данных
-   **JWT** — авторизация по токену
-   **Swagger** — автогенерация документации

---

### 🗂️ Структура проекта

📁 **config**  
  📄 `database.js` — конфигурация подключения к базе  
  📄 `create_table.js` — удаление и пересоздание таблиц  
  📄 `seed.js` — заполнение таблиц начальными данными

📁 **controllers**  
  📄 `authorController.js`  
  📄 `bookController.js`  
  📄 `categoryController.js`  
  📄 `commentController.js`  
  📄 `authController.js`

📁 **middleware**  
  📄 `authJwt.js` — проверка токена и ролей

📁 **models**  
  📄 `author.js`, `book.js`, `category.js`, `comment.js`, `user.js`, `role.js`, и т.д.

📁 **routes**  
  📄 `authorRoutes.js`, `bookRoutes.js`, `categoryRoutes.js`, `commentRoutes.js`, `authRoutes.js`

📄 `index.js` — точка входа в приложение  
📄 `swagger-autogen.js` — генерация Swagger-документации  
📄 `swagger.json` — сгенерированный файл Swagger  
📄 `.env`, `.gitignore`, `package.json`, `README.md`

---

## 🚀 Запуск проекта

```bash
npm install                         # Установка зависимостей
node config/create_table.js         # Создание таблиц
node seed.js                        # Заполнение тестовыми данными
node index.js                       # Запуск сервера
```

## Для регистрации под админом:

```bash
    username: "admin"
    password: "admin123"
```
