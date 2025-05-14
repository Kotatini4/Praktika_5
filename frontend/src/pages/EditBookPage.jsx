import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

export default function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [titleError, setTitleError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    useEffect(() => {
        fetchBook();
        fetchCategories();
    }, []);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/books/${id}`);
            const book = res.data.data;
            setTitle(book.title || "");
            setDescription(book.description || "");
            setYear(book.publicationYear || "");
            setCategoryId(
                book.category?.categoryId
                    ? String(book.category.categoryId)
                    : ""
            );
            setLoading(false);
        } catch (err) {
            console.error("Ошибка загрузки книги:", err);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/categories");
            setCategories(res.data.data || []);
        } catch (err) {
            console.error("Ошибка загрузки категорий:", err);
        }
    };

    const handleUpdate = async () => {
        const isTitleValid = title.trim() !== "";
        const isYearValid = String(year).trim() !== "";
        const isCategoryValid = categoryId !== "";

        setTitleError(!isTitleValid);
        setYearError(!isYearValid);
        setCategoryError(!isCategoryValid);

        if (!isTitleValid || !isYearValid || !isCategoryValid) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/books/${id}`,
                {
                    book_title: title,
                    book_description: description,
                    publication_year: year,
                    category_id: categoryId,
                    author_ids: [1], // временно, пока не добавлен выбор авторов
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate("/books");
        } catch (err) {
            console.error("Ошибка при обновлении книги:", err);
        }
    };

    if (loading) return <Typography>Загрузка...</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Редактировать книгу
            </Typography>

            <Stack spacing={2} mb={3}>
                <TextField
                    label="Название"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={titleError}
                    helperText={titleError ? "Название обязательно" : ""}
                />
                <TextField
                    label="Описание"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Год публикации"
                    variant="outlined"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    error={yearError}
                    helperText={yearError ? "Год обязателен" : ""}
                />
                <FormControl fullWidth error={categoryError}>
                    <InputLabel id="category-label">Жанр</InputLabel>
                    <Select
                        labelId="category-label"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Выберите жанр</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem
                                key={cat.categoryId}
                                value={String(cat.categoryId)}
                            >
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {categoryError && (
                        <Typography variant="caption" color="error">
                            Жанр обязателен
                        </Typography>
                    )}
                </FormControl>
            </Stack>

            <Box display="flex" gap={2}>
                <Button variant="contained" onClick={handleUpdate}>
                    Сохранить
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Отмена
                </Button>
            </Box>
        </Container>
    );
}
