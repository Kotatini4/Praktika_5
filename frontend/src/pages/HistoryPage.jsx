import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/history", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHistory(res.data);
        } catch (err) {
            console.error("Ошибка при получении истории:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Удалить запись?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/history/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchHistory();
        } catch (err) {
            console.error("Ошибка при удалении:", err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = history.slice(start, start + ITEMS_PER_PAGE);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                История действий
            </Typography>
            <List>
                {paginated.map((record) => (
                    <React.Fragment key={record.id}>
                        <ListItem
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDelete(record.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={record.description}
                                secondary={new Date(
                                    record.date
                                ).toLocaleString()}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

            <Pagination
                count={Math.ceil(history.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{ mt: 2 }}
            />
        </Container>
    );
}
