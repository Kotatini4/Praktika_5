require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Подключение к базе данных
const db = require("./config/database");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Импорт маршрутов
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");

// Middleware
app.use(cors()); // Разрешает CORS-запросы
app.use(express.json()); // Распознаёт JSON в теле запроса

// Swagger UI доступен по адресу http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Роуты
app.use("/", historyRoutes);
app.use("/", authorRoutes);
app.use("/", bookRoutes);
app.use("/", categoryRoutes);
app.use("/", commentRoutes);
app.use("/", authRoutes);

// Проверка подключения к базе данных
db.authenticate()
    .then(() => console.log("✅ Database connected..."))
    .catch((err) => console.log("❌ DB Error: " + err));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
    console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
