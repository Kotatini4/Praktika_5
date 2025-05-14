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

exports.deleteHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await History.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: "Запись не найдена" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении записи" });
    }
};
