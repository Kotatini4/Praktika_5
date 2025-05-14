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
/
├── Backend/ # Серверная часть (Node.js + Express)
│ ├── config/ # Конфигурация подключения к базе данных (Sequelize)
│ ├── controllers/ # Логика обработки запросов для маршрутов
│ ├── middleware/ # JWT токены, проверка ролей, авторизация
│ ├── models/ # Sequelize модели (User, Book, Author, Category и т.д.)
│ ├── routes/ # Файлы маршрутов (например, /books, /authors, /history)
│ ├── utils/ # Вспомогательные функции (например, логирование действий)
│ ├── images/ # Хранилище изображений (например, обложки книг)
│ ├── .env # Переменные окружения (не загружается в git)
│ ├── index.js # Основной запуск сервера Express
│ ├── seed.js # Заполнение базы начальными данными
│ ├── swagger.js # Настройка Swagger UI
│ ├── swagger-autogen.js # Скрипт генерации swagger.json из JSDoc
│ ├── swagger.json # Автоматически сгенерированная документация API
│ ├── test-connection.js # Проверка подключения к базе данных
│ └── README.md # Документация по Backend (можно объединить)

├── frontend/ # Клиентская часть (React + MUI)
│ ├── public/ # HTML шаблон и favicon
│ ├── src/ # Исходный код React-приложения
│ │ ├── pages/ # Отдельные страницы (Books, Authors, History и т.д.)
│ │ ├── components/ # Повторно используемые компоненты (Navbar, карточки и т.д.)
│ │ ├── context/ # Контекст авторизации (AuthContext.jsx)
│ │ ├── App.js # Главный компонент приложения (роутинг)
│ │ └── index.js # Точка входа React-приложения
│ ├── .env # URL API и переменные окружения
│ └── README.md # Документация по фронтенду (опционально)

├── images/ # Общая директория для документов или медиа
└── README.md # Основная документация проекта
