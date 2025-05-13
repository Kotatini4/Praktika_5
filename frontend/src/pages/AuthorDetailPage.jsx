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

export default function AuthorDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuthor();
    }, []);

    const fetchAuthor = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/authors/${id}`);
            console.log('Ответ от сервера:', res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setLoading(false);
        } catch (err) {
            console.error('Ошибка загрузки автора:', err);
            setLoading(false);
        }
    };


    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/authors/${id}`,
                {
                    first_name: firstName,
                    last_name: lastName
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/authors');
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm('Вы уверены, что хотите удалить этого автора?');
        if (!confirm) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/authors/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/authors');
        } catch (err) {
            console.error('Ошибка при удалении:', err);
        }
    };

    if (loading) return <Typography>Загрузка...</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Редактировать автора
            </Typography>

            <Stack spacing={2} mb={3}>
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
            </Stack>

            <Box display="flex" gap={2}>
                <Button variant="contained" onClick={handleUpdate}>
                    Сохранить
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    Удалить
                </Button>
            </Box>
        </Container>
    );
}
