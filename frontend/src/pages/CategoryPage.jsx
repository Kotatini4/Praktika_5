import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Pagination,
} from "@mui/material";
import axios from "axios";

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/categories");
            setCategories(res.data.data || res.data);
        } catch (err) {
            console.error("Ошибка при загрузке жанров:", err);
        }
    };

    const handleAdd = async () => {
        if (!name.trim()) {
            setError("Название обязательно");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:3000/categories",
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setName("");
            setError("");
            fetchCategories();
        } catch (err) {
            console.error("Ошибка при добавлении жанра:", err);
            setError("Такой жанр уже существует или сервер недоступен");
        }
    };

    // Пагинация
    const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
    const visibleCategories = categories.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Жанры
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                <TextField
                    label="Название жанра"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
                <Button variant="contained" onClick={handleAdd}>
                    Добавить
                </Button>
            </Stack>

            <List>
                {visibleCategories.map((cat) => (
                    <ListItem key={cat.categoryId} divider>
                        <ListItemText primary={cat.name} />
                    </ListItem>
                ))}
            </List>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => setPage(val)}
                sx={{ mt: 2 }}
            />
        </Container>
    );
}
