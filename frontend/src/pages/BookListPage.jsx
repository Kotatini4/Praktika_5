import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Pagination,
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
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchCategories();
        fetchAuthors();
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [page]);

    const fetchBooks = async () => {
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const params = new URLSearchParams();

        if (search) params.append("title", search);
        if (categoryId) params.append("category_id", categoryId);
        if (authorIds.length > 0)
            params.append("author_ids", authorIds.join(","));
        params.append("limit", ITEMS_PER_PAGE);
        params.append("offset", offset);

        const res = await axios.get(
            `http://localhost:3000/books?${params.toString()}`
        );
        const data = res.data;

        if (data.data.length > 0) {
            setBooks(data.data);
            setTotal(data.total);
            setNotFound(false);
        } else {
            setBooks([]);
            setTotal(0);
            setNotFound(true);
        }
    };

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data.data || []);
    };

    const fetchAuthors = async () => {
        const res = await axios.get("http://localhost:3000/authors");
        setAuthors(res.data || []);
    };

    const handleSearch = () => {
        setPage(1); // сбрасываем на первую страницу при новом поиске
        fetchBooks();
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
                <>
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
                                            .join(", ") ||
                                            "Автор не указан"}{" "}
                                        | Категория:{" "}
                                        {book.category?.name || "—"}
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

                    <Pagination
                        count={Math.ceil(total / ITEMS_PER_PAGE)}
                        page={page}
                        onChange={(e, val) => setPage(val)}
                        sx={{ mt: 2 }}
                    />
                </>
            )}
        </Container>
    );
}
