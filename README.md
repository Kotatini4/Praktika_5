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

📂 **Project_2/**

    📂 **config**
        📄 database.js # Конфигурация базы данных

    📂 **controllers**
        📄 authController.js # Контроллер для создания и логирования
        📄 actorController.js # Контроллер для актёров
        📄 categoryController.js # Контроллер для категорий
        📄 filmActorController.js # Контроллер для связи фильмов и актёров
        📄 filmCategoryController.js # Контроллер для связи фильмов и категории
        📄 filmController.js # Контроллер для фильмов
        📄 userController.js # Контроллер для пользователей

    📂 **CSS**
    📂 **images**

    📂 **models**
        📄 actor.js # Модель актёра
        📄 category.js # Модель категории
        📄 film_actor.js # Модель связи фильмов и актёров
        📄 film_category.js # Модель связи фильмов и категорий
        📄 film.js # Модель фильма
        📄 init-models.js # Инициализация моделей
        📄 language.js # Модель языка
        📄 user.js # Модель пользователя

    📂 **node_modules** # Установленные зависимости

    📂 **routes**
        📄 actorRoutes.js          # Маршруты для актёров
        📄 authRoutes.js           # Маршруты для аутентификации
        📄 categoryRoutes.js       # Маршруты для категорий
        📄 filmActorRoutes.js      # Маршруты для связи фильмов и актёров
        📄 filmCategoryRoutes.js   # Маршруты для связи фильмов и категорий
        📄 filmRoutes.js           # Маршруты для фильмов
        📄 userRoutes.js           # Маршруты для пользователей

        📄 .env # Переменные окружения
        📄 .gitignore # Игнорируемые файлы для Git
        📄 index.html # Главная страница
        📄 index.js # Точка входа в приложение
        📄 package-lock.json # Зависимости (автоматически генерируется)
        📄 package.json # Зависимости и скрипты

<pre>## Привмер запроса

1. ## Категории (Categories)
    • GET /api/categories — Получить все категории.
    • GET /api/categories/count — Получить количество категорий.
    • GET /api/categories/search/:name — Поиск категорий по названию (без учета регистра).
    • GET /api/categories/:id — Получить категорию по ID.
    • POST /api/categories — Создать новую категорию.
    • PUT /api/categories/:id — Обновить категорию по ID.
    • DELETE /api/categories/:id — Удалить категорию по ID.

2. ## Актеры (Actors)
    • GET /api/actor — Получить всех актеров, сортировка по actor_id (по умолчанию): 
        • # Сортировка
        • /api/actor?sortBy=first_name&order=ASC — Сортировка по first_name в порядке возрастания:
        • /api/actor?sortBy=last_name&order=DESC — Сортировка по last_name в порядке убывания:

    • GET /api/actor/count — Получить количество актеров.
    • GET /api/actor/search/:name — Поиск актеров по имени (без учета регистра).
    • GET /api/actor/:id — Получить актера по ID.
    • POST /api/actor — Создать нового актера.
    {
    "first_name": "Leonardo",
    "last_name": "DiCaprio"
    }
    • PUT /api/actor/:id — Обновить актера по ID.
    • DELETE /api/actor/:id — Удалить актера по ID.

3. ## Фильмы (Films)
    • GET /api/film — Получить все фильмы. 
        • # Пагинация
        /api/film?page=2&limit=5  —  Пример запроса с пагинацией 

    • GET /api/film/count — Получить количество фильмов.
    • GET /api/film/search/: title — Поиск фильмов по названию (без учета регистра).
    • GET /api/film/:id — Получить фильм по ID.
    • GET /api/film/language/: language_id— Получить фильм по языку.
    • GET /api/film/category/: category_id — Получить фильм категории.
    • POST /api/film — Создать новый фильм.
    • {
    • "title": "Inception",
    • "release_year": 2010,
    • "genre": "Sci-Fi",
    • "director": "Christopher Nolan",
    • "language": "English"
    • }
    • PUT /api/film/:id — Обновить фильм по ID.
    • DELETE /api/film/:id — Удалить фильм по ID.

4. ## Связь фильмов и актеров (Film Actors)
    • GET /api/film_actors — Получить все связи фильмов и актеров.
    • GET /api/film_actors/:id — Получить связь фильма и актера по ID.
    • POST /api/film_actors — Создать новую связь фильма и актера.
    • PUT /api/film_actors/:id — Обновить связь фильма и актера по ID.
    • DELETE /api/film_actors/:id — Удалить связь фильма и актера по ID.
    • GET /api/film_actors/actor/:actor_id — Получить фильмы по ID актера.
    • GET /api/film_actors/film/:film_id — Получить актеров по ID фильма.

5. Связь фильмов и категорий (film Category)
    •	GET api/film_categories— Получить все связи фильмов и категорий.
    •	GET api/film_categories/: film_id/:category_id — Получить связь фильма и категории по ID
    •	POST api/film_categories — Создать новую связь фильма и категории
    •	{
    •	  "film_id": 1,
    •	  "category_id": 2
    •	}
    •	PUT api/film_categories/: film_id/:category_id — Обновить связь фильма и категории по ID
    •	{
    •	  "film_id": 1,
    •	  "category_id": 3
    •	}
    •	DELETE api/film_categories/:film_id/:category_id — Удалить связь фильма и категории по ID
    •	GET api/film_categories/category/: category_id — Получить фильмы по ID категории
    •	GET api/film_categories/film/: film_id — Получить категории по ID фильма

6. Добавление пользователя и логирование (auth Controller)
    •	POST api/auth/register - Регистрация пользователя
    •	POST api/auth/login - Логин пользователя


## Настройка запросов требующих авторизацию:
Используйте инструмент для выполнения HTTP headers
Установите следующие параметры запроса:
Метод запроса: GET
URL: http://localhost:3000/api/user

В заголовках запроса Headers укажите Bearer Token для авторизации:

Authorization: Bearer <ваш_токен>


</pre>

=======
Проект: Управление категориями фильмов
Этот проект представляет собой RESTful API для управления категориями фильмов. Он позволяет создавать, читать, обновлять и удалять категории, а также выполнять поиск по имени.

<pre>
Технологии
Node.js — среда выполнения JavaScript.
Express.js — фреймворк для создания веб-приложений.
Sequelize — ORM для работы с базой данных.
PostgreSQL — реляционная база данных.
</pre>
