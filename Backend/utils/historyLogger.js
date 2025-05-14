const { History } = require('../models');

const logHistory = async (description) => {
    try {
        await History.create({
            description,
            date: new Date()
        });
    } catch (error) {
        console.error('Ошибка при записи истории:', error.message);
    }
};

module.exports = { logHistory };
