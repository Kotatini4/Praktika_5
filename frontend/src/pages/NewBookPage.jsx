import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Box,
    Paper,
} from "@mui/material";

export default function NewBookPage() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [authorIds, setAuthorIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [notification, setNotification] = useState("");
    const [categoryError, setCategoryError] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchAuthors();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data.data || []);
    };

    const fetchAuthors = async () => {
        const res = await axios.get("http://localhost:3000/authors");
        setAuthors(res.data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryId) {
            setCategoryError(true);
            return;
        } else {
            setCategoryError(false);
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:3000/books",
                {
                    book_title: title,
                    publication_year: year,
                    category_id: categoryId,
                    author_ids: authorIds,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setTitle("");
            setYear("");
            setCategoryId("");
            setAuthorIds([]);
            setNotification("Книга успешно добавлена!");
            setTimeout(() => setNotification(""), 3000);
        } catch (error) {
            console.error("Ошибка при добавлении книги:", error);
            setNotification("Ошибка при добавлении книги.");
            setTimeout(() => setNotification(""), 3000);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Добавить новую книгу
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Название"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Год публикации"
                            type="number"
                            inputProps={{
                                min: 0,
                                max: new Date().getFullYear(),
                            }}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            fullWidth
                            required
                        />
                        <FormControl fullWidth error={categoryError}>
                            <InputLabel id="category-label">Жанр</InputLabel>
                            <Select
                                labelId="category-label"
                                value={categoryId}
                                label="Жанр"
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Выберите жанр</em>
                                </MenuItem>
                                {categories.map((cat) => (
                                    <MenuItem
                                        key={cat.categoryId}
                                        value={cat.categoryId}
                                    >
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {categoryError && (
                                <Typography variant="caption" color="error">
                                    Пожалуйста, выберите жанр
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="authors-label">Авторы</InputLabel>
                            <Select
                                labelId="authors-label"
                                multiple
                                value={authorIds}
                                onChange={(e) => setAuthorIds(e.target.value)}
                                input={<OutlinedInput label="Авторы" />}
                                renderValue={(selected) =>
                                    authors
                                        .filter((a) =>
                                            selected.includes(a.authorId)
                                        )
                                        .map(
                                            (a) =>
                                                `${a.firstName} ${a.lastName}`
                                        )
                                        .join(", ")
                                }
                            >
                                {authors.map((a) => (
                                    <MenuItem
                                        key={a.authorId}
                                        value={a.authorId}
                                    >
                                        <Checkbox
                                            checked={authorIds.includes(
                                                a.authorId
                                            )}
                                        />
                                        <ListItemText
                                            primary={`${a.firstName} ${a.lastName}`}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">
                            Добавить
                        </Button>
                    </Stack>
                </Box>
                {notification && (
                    <Typography variant="body1" color="success.main" mt={2}>
                        {notification}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}
