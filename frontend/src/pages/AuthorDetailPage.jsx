import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";

export default function AuthorDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(true);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);

    const fetchAuthor = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/authors/${id}`);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setLoading(false);
        } catch (err) {
            console.error("Ошибка загрузки автора:", err);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchAuthor();
    }, [fetchAuthor]);

    const handleSave = async () => {
        const isFirstNameValid = firstName.trim() !== "";
        const isLastNameValid = lastName.trim() !== "";

        setFirstNameError(!isFirstNameValid);
        setLastNameError(!isLastNameValid);

        if (!isFirstNameValid || !isLastNameValid) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/authors/${id}`,
                { first_name: firstName, last_name: lastName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate("/authors");
        } catch (err) {
            console.error("Ошибка при обновлении автора:", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Редактирование автора
            </Typography>

            {loading ? (
                <Typography>Загрузка...</Typography>
            ) : (
                <Stack spacing={2} maxWidth="sm">
                    <TextField
                        label="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={firstNameError}
                        helperText={firstNameError ? "Поле обязательно" : ""}
                    />
                    <TextField
                        label="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameError}
                        helperText={lastNameError ? "Поле обязательно" : ""}
                    />
                    <Button variant="contained" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Stack>
            )}
        </Container>
    );
}
