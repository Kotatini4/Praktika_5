const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        schema: process.env.DB_SCHEMA,
        pool: {
            max: 10, // Maksimaalne ühenduste arv
            min: 0, // Miinimum ühenduste arv
            acquire: 30000, // Maksimaalne aeg millisekundites, mille jooksul Pool saab ühendusi hankida
            idle: 10000, // Maksimaalne aeg millisekundites, mille jooksul ühendused võivad olla Pool'is enne nende vabastamist
        },
    }
);

//Connect to database
sequelize
    .authenticate()
    .then(() => {
        console.log(
            "Connection to the database has been established successfully."
        );
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
