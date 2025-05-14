<<<<<<< HEAD
![TalTech Logo](images/tal-tech.png)

# TALLINNA TEHNIKAÜLIKOOL

### INSENERITEADUSKOND

**Virumaa kolledž**

**RAM0541 Veebiprogrammeerimine** _(N. Ivleva)_

### ** Технологии **

Node.js — среда выполнения JavaScript.<br>
Express.js — фреймворк для создания веб-приложений.<br>
Sequelize — ORM для работы с базой данных.<br>
PostgreSQL — реляционная база данных.<br>
REST API — для взаимодействия с клиентской частью.<br>

📂 **Project_5/**

📦 Структура проекта

```bash
├── Backend/ # Серверная часть (Node.js + Express)
│ ├── config/ # Настройки подключения к базе данных
│ ├── controllers/ # Логика API (обработка запросов)
│ ├── middleware/ # JWT, авторизация и роли
│ ├── models/ # Sequelize-модели (User, Book, Author и др.)
│ ├── routes/ # Маршруты (books, authors, categories, history)
│ ├── utils/ # Вспомогательные функции (например, логирование)
│ ├── images/ # Обложки книг / другие файлы
│ ├── .env # Переменные окружения
│ ├── index.js # Точка запуска сервера
│ ├── seed.js # Заполнение базы начальными данными
│ ├── swagger.js # Конфигурация Swagger
│ ├── swagger-autogen.js # Генерация swagger.json из JSDoc
│ ├── swagger.json # Автосгенерированная документация API
│ ├── test-connection.js # Тестовое подключение к БД


├── frontend/ # Клиентская часть (React + MUI)
│ ├── public/ # HTML шаблон и favicon
│ ├── src/ # Исходный код
│ │ ├── pages/ # Страницы (Books, Authors, History и др.)
│ │ ├── components/ # Повторно используемые компоненты (Navbar и т.д.)
│ │ ├── context/ # Контекст (например, AuthContext.jsx)
│ │ ├── App.js # Главный компонент с роутингом
│ │ └── index.js # Точка входа React-приложения
│ │ .env # URL API и другие переменные
├── images/ # Общие изображения и ресурсы
└── README.md # Главная документация проекта


Запуск сервера: Praktika_5\Backend> node index.js
После запуска сервера документация доступна по адресу:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)
запуск фронта: Praktika_5\frontend> npm start

Окно в браузере должно открыться автоматически.

Для тестирования можно создать пользователя, с правами доступа user. Может только просматривать книги и добавлять коментарии, удалять только свои.
log: user
pass: user123

Администратор может всё.
log: admin
pass: admin123
```
