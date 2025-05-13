import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    Typography,
    Button,
    TextField,
    Box,
    Stack,
    Paper,
    Divider
} from '@mui/material';

export default function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        const res = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(res.data.data);
        if (res.data.data.comments) setComments(res.data.data.comments);
    };

    const handleComment = async () => {
        const token = localStorage.getItem('token');
        await axios.post(
            `http://localhost:3000/books/${id}/comments`,
            { body: comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setComment('');
        fetchBook();
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (window.confirm('Вы уверены, что хотите удалить книгу?')) {
            await axios.delete(`http://localhost:3000/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/');
        }
    };
    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const confirm = window.confirm('Удалить комментарий?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3000/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBook(); // обновим список комментариев
        } catch (err) {
            console.error('Ошибка при удалении комментария:', err);
        }
    };

    if (!book) return <Typography>Загрузка...</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>{book.title}</Typography>
                <Typography><strong>Автор:</strong> {book.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}</Typography>
                <Typography><strong>Год:</strong> {book.publicationYear}</Typography>
                <Typography><strong>Жанр:</strong> {book.category?.name}</Typography>

                {user?.role?.name === 'admin' && (
                    <Stack direction="row" spacing={2} mt={2}>
                        <Button variant="contained" component={Link} to={`/books/${id}/edit`}>
                            Редактировать
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            Удалить
                        </Button>
                    </Stack>
                )}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6">Комментарии</Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                    {comments.map((c) => (
                        <li key={c.id}>
                            <Typography variant="subtitle2" color="text.secondary">
                                {c.author?.username} ({new Date(c.createdAt).toLocaleString()})
                            </Typography>
                            <Typography variant="body1">{c.body}</Typography>

                            {user && (
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteComment(c.id)}
                                >
                                    Удалить
                                </Button>
                            )}
                        </li>
                    ))}
                </Box>


                {user && (
                    <Box mt={3}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Оставьте комментарий"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleComment} sx={{ mt: 1 }}>
                            Добавить
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
