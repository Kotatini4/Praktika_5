import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/books/${id}`);
            const book = res.data.data;
            setTitle(book.title || '');
            setDescription(book.description || '');
            setYear(book.publicationYear || '');
            setLoading(false);
        } catch (err) {
            console.error('Ошибка загрузки книги:', err);
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/books/${id}`,
                {
                    book_title: title,
                    book_description: description,
                    publication_year: year,
                    category_id: 1,      // можно заменить выбором жанра
                    author_ids: [1]      // можно заменить выбором авторов
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            navigate(`/books/${id}`);
        } catch (err) {
            console.error('Ошибка при обновлении книги:', err);
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
                />
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
