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
    ListItemSecondaryAction
} from '@mui/material';

export default function BookListPage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await axios.get('http://localhost:3000/books');
        setBooks(res.data.data);
    };

    const handleSearch = async () => {
        const res = await axios.get(`http://localhost:3000/books?title=${search}`);
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

            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    label="Поиск по названию"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />
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
