import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Stack,
    List,
    ListItem,
    MenuItem,
    Box,
} from "@mui/material";

export default function BookListPage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [authorIds, setAuthorIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchBooks();
        fetchCategories();
        fetchAuthors();
    }, []);

    const fetchBooks = async () => {
        const res = await axios.get("http://localhost:3000/books");
        console.log("Ответ от сервера:", res.data);
        setBooks(res.data.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data.data || []);
    };

    const fetchAuthors = async () => {
        const res = await axios.get("http://localhost:3000/authors");
        setAuthors(res.data || []);
    };

    const handleSearch = async () => {
        const params = new URLSearchParams();

        if (search) params.append("title", search);
        if (categoryId) params.append("category_id", categoryId);
        if (authorIds.length > 0)
            params.append("author_ids", authorIds.join(","));

        const res = await axios.get(
            `http://localhost:3000/books?${params.toString()}`
        );

        if (res.data.data.length > 0) {
            setBooks(res.data.data);
            setNotFound(false);
        } else {
            setBooks([]);
            setNotFound(true);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Список книг
            </Typography>

            <Stack spacing={2} mb={3}>
                <TextField
                    label="Поиск по названию"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />

                <TextField
                    select
                    label="Категория"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="">Все категории</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Авторы"
                    value={authorIds}
                    onChange={(e) =>
                        setAuthorIds(
                            typeof e.target.value === "string"
                                ? e.target.value.split(",")
                                : e.target.value
                        )
                    }
                    SelectProps={{ multiple: true }}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>Все авторы</em>
                    </MenuItem>
                    {authors.map((a) => (
                        <MenuItem key={a.authorId} value={a.authorId}>
                            {a.firstName} {a.lastName}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="contained" onClick={handleSearch}>
                    Поиск
                </Button>
            </Stack>

            {notFound ? (
                <Typography>Книги не найдены</Typography>
            ) : (
                <List>
                    {books.map((book) => (
                        <ListItem
                            key={book.bookId}
                            divider
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{ wordBreak: "break-word" }}
                                >
                                    {book.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {book.authors
                                        ?.map(
                                            (a) =>
                                                `${a.firstName} ${a.lastName}`
                                        )
                                        .join(", ") || "Автор не указан"}{" "}
                                    | Категория: {book.category?.name || "—"}
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                component={Link}
                                to={`/books/${book.bookId}`}
                                sx={{
                                    whiteSpace: "nowrap",
                                    alignSelf: "center",
                                }}
                            >
                                ПОДРОБНЕЕ
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}
