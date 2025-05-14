const History = require("../models/history");

exports.getAllHistory = async (req, res) => {
    try {
        const records = await History.findAll({
            order: [["id", "DESC"]],
        });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при получении истории" });
    }
};
