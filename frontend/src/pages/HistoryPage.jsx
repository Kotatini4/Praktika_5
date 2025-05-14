import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHistory(res.data);
            } catch (err) {
                console.error("Ошибка при получении истории:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                История действий
            </Typography>
            <List>
                {history.map((record) => (
                    <React.Fragment key={record.id}>
                        <ListItem>
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
        </Container>
    );
}
