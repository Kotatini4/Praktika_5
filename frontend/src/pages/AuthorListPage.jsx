import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AuthorListPage() {
    const [authors, setAuthors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchAuthors();

        // Проверка, авторизован ли пользователь
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const fetchAuthors = async () => {
        const res = await axios.get('http://localhost:3000/authors');
        setAuthors(res.data);
    };

    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:3000/authors',
            {
                first_name: firstName,
                last_name: lastName
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        setFirstName('');
        setLastName('');
        fetchAuthors();
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/authors/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchAuthors();
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Авторы
            </Typography>

            {isLoggedIn && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
                    <TextField
                        label="Имя"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAdd}>
                        Добавить
                    </Button>
                </Stack>
            )}

            <List>
                {authors.map((author) => (
                    <ListItem key={author.authorId} divider>
                        <ListItemText primary={`${author.firstName} ${author.lastName}`} />
                        {isLoggedIn && (
                            <ListItemSecondaryAction>
                                <IconButton
                                    component={Link}
                                    to={`/authors/${author.authorId}`}
                                    edge="end"
                                    aria-label="edit"
                                    sx={{ mr: 1 }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleDelete(author.authorId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}
