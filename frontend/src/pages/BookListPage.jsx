import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    MenuItem
} from '@mui/material';

export default function BookListPage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
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
        const res = await axios.get('http://localhost:3000/books');
        setBooks(res.data.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:3000/categories');
        setCategories(res.data.data || []);
    };

    const fetchAuthors = async () => {
        const res = await axios.get('http://localhost:3000/authors');
        setAuthors(res.data || []);
    };

    const handleSearch = async () => {
        const params = new URLSearchParams();

        if (search) params.append('title', search);
        if (categoryId) params.append('category_id', categoryId);
        if (authorIds.length > 0) params.append('author_ids', authorIds.join(','));

        const res = await axios.get(`http://localhost:3000/books?${params.toString()}`);

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
                            typeof e.target.value === 'string'
                                ? e.target.value.split(',')
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
                        <ListItem key={book.bookId} divider>
                            <ListItemText
                                primary={book.title}
                                secondary={
                                    <>
                                        {book.authors && book.authors.length > 0
                                            ? book.authors.map((a) => `${a.firstName} ${a.lastName}`).join(', ')
                                            : 'Автор не указан'}
                                        {book.category && (
                                            <> | Категория: {book.category.name}</>
                                        )}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={`/books/${book.bookId}`}
                                >
                                    Подробнее
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>


            )}
        </Container>
    );
}
