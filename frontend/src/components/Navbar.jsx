import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Container
} from '@mui/material';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            Книги
                        </Typography>
                        {user?.role?.name === 'admin' && (
                            <Button color="inherit" component={Link} to="/books/new">
                                Добавить книгу
                            </Button>
                        )}
                        <Button color="inherit" component={Link} to="/authors">
                            Авторы
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {user ? (
                            <>
                                <Typography variant="body1">
                                    {user.username}
                                </Typography>
                                <Button color="inherit" onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Вход
                            </Button>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}