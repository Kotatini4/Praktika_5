import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import NewBookPage from "./pages/NewBookPage";
import EditBookPage from "./pages/EditBookPage";
import AuthorListPage from "./pages/AuthorListPage";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import HistoryPage from "./pages/HistoryPage";

function PrivateRoute({ children, roles }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role.name)) return <Navigate to="/" />;
    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/*<Route path="/" element={<BookListPage />} />*/}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books/:id" element={<BookDetailPage />} />
                    <Route path="/books" element={<BookListPage />} />
                    <Route
                        path="/books/new"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <NewBookPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/books/:id/edit"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <EditBookPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <HistoryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/categories/manage"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <CategoryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/authors"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <AuthorListPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/authors/:id"
                        element={
                            <PrivateRoute roles={["admin"]}>
                                <AuthorDetailPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
