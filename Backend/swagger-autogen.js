const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = [
    "./routes/authorRoutes.js",
    "./routes/bookRoutes.js",
    "./routes/categoryRoutes.js",
    "./routes/commentRoutes.js",
    "./routes/authRoutes.js",
];

const doc = {
    info: {
        title: "Library API Documentation",
        description: "Документация для системы книг, авторов и комментариев",
    },
    host: "localhost:3000",
    schemes: ["http"],
    tags: [
        { name: "Authors", description: "Управление авторами" },
        { name: "Books", description: "Управление книгами" },
        { name: "Categories", description: "Категории книг" },
        { name: "Comments", description: "Комментарии к книгам" },
        { name: "Auth", description: "Управление авторизацией" },
        { name: "Users", description: "Управление пользователями" },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Введите токен в формате: Bearer <ваш_токен>",
        },
    },
    security: [{ bearerAuth: [] }],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
