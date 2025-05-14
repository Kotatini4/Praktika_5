import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
    const { user } = useAuth();

    return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
                Добро пожаловать в Библиотеку
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
                Здесь вы можете найти и управлять книгами, авторами и жанрами.
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
                <Button variant="contained" component={Link} to="/books">
                    Смотреть книги
                </Button>
                {!user && (
                    <Button variant="outlined" component={Link} to="/login">
                        Войти
                    </Button>
                )}
            </Stack>
        </Container>
    );
}
