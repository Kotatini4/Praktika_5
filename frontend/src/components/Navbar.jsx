import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Container,
} from "@mui/material";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between" }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* Кнопка "Домой" всегда */}
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{ textDecoration: "none", color: "inherit" }}
                        >
                            Домой
                        </Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            component={Link}
                            to="/books"
                            sx={{ borderRadius: 2, fontWeight: 500 }}
                        >
                            Смотреть книги
                        </Button>

                        {/* Только для админа */}
                        {user?.role?.name === "admin" && (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    to="/books/new"
                                >
                                    Книги
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    to="/authors"
                                >
                                    Авторы
                                </Button>
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {user ? (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                >
                                    Вход
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    to="/register"
                                >
                                    Регистрация
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
