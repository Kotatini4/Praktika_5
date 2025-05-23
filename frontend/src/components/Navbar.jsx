import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Container,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorData, setAnchorData] = useState(null); // для "Добавить данные"
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const commonLinks = [
        <MenuItem key="home" component={Link} to="/" onClick={handleMenuClose}>
            Домой
        </MenuItem>,
        <MenuItem
            key="books"
            component={Link}
            to="/books"
            onClick={handleMenuClose}
        >
            Смотреть книги
        </MenuItem>,
    ];

    const authLinks = user
        ? [
              <MenuItem key="username" disabled>
                  {user.username}
              </MenuItem>,
              <MenuItem
                  key="logout"
                  onClick={() => {
                      handleLogout();
                      handleMenuClose();
                  }}
              >
                  Выйти
              </MenuItem>,
          ]
        : [
              <MenuItem
                  key="login"
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
              >
                  Вход
              </MenuItem>,
              <MenuItem
                  key="register"
                  component={Link}
                  to="/register"
                  onClick={handleMenuClose}
              >
                  Регистрация
              </MenuItem>,
          ];

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                {commonLinks}
                                {user?.role?.name === "admin" && (
                                    <>
                                        <MenuItem
                                            component={Link}
                                            to="/books/new"
                                        >
                                            Книги
                                        </MenuItem>
                                        <MenuItem
                                            component={Link}
                                            to="/authors"
                                        >
                                            Авторы
                                        </MenuItem>
                                        <MenuItem
                                            component={Link}
                                            to="/categories/manage"
                                        >
                                            Жанры
                                        </MenuItem>
                                        <MenuItem
                                            component={Link}
                                            to="/history"
                                            onClick={() => setAnchorData(null)}
                                        >
                                            История изменений
                                        </MenuItem>
                                    </>
                                )}
                                {authLinks}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {/* Левая часть */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/"
                                    >
                                        Домой
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/books"
                                    >
                                        Смотреть книги
                                    </Button>

                                    {user?.role?.name === "admin" && (
                                        <>
                                            <Button
                                                color="inherit"
                                                onClick={(e) =>
                                                    setAnchorData(
                                                        e.currentTarget
                                                    )
                                                }
                                                endIcon={<ArrowDropDownIcon />}
                                            >
                                                Добавить данные
                                            </Button>
                                            <Menu
                                                anchorEl={anchorData}
                                                open={Boolean(anchorData)}
                                                onClose={() =>
                                                    setAnchorData(null)
                                                }
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "left",
                                                }}
                                            >
                                                <MenuItem
                                                    component={Link}
                                                    to="/books/new"
                                                    onClick={() =>
                                                        setAnchorData(null)
                                                    }
                                                >
                                                    Добавить книгу
                                                </MenuItem>
                                                <MenuItem
                                                    component={Link}
                                                    to="/authors"
                                                    onClick={() =>
                                                        setAnchorData(null)
                                                    }
                                                >
                                                    Добавить автора
                                                </MenuItem>
                                                <MenuItem
                                                    component={Link}
                                                    to="/categories/manage"
                                                    onClick={() =>
                                                        setAnchorData(null)
                                                    }
                                                >
                                                    Добавить жанр
                                                </MenuItem>
                                                <MenuItem
                                                    component={Link}
                                                    to="/history"
                                                    onClick={() =>
                                                        setAnchorData(null)
                                                    }
                                                >
                                                    История изменений
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </Stack>
                            </Box>

                            {/* Правая часть */}
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                {user ? (
                                    <>
                                        <Typography noWrap sx={{ mr: 1 }}>
                                            {user.username}
                                        </Typography>
                                        <Button
                                            color="inherit"
                                            onClick={handleLogout}
                                        >
                                            Выйти
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            color="inherit"
                                            component={Link}
                                            to="/login"
                                        >
                                            Вход
                                        </Button>
                                        <Button
                                            color="inherit"
                                            component={Link}
                                            to="/register"
                                        >
                                            Регистрация
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
