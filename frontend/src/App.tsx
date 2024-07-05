import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/public/Profile";
import About from "./pages/public/About";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { authUser } from "./apis/auth.api";
import BookList from "./pages/admin/BookList";
import UserList from "./pages/admin/UserList";
import GenreList from "./pages/admin/GenreList";
import AddBook from "./pages/admin/AddBook";
import { getAllGenres } from "./apis/genre.api";
import { getAllBooks } from "./apis/book.api";
import UpdateBook from "./pages/admin/UpdateBook";
import Book from "./pages/public/Book";
import AdminRouter from "./components/AdminRouter";

const App = () => {
  useQuery({
    queryKey: ["authUser"],
    queryFn: () => authUser(),
    retry: false,
  });
  useQuery({
    queryKey: ["genreList"],
    queryFn: () => getAllGenres(),
    retry: false,
  });
  useQuery({
    queryKey: ["bookList"],
    queryFn: () => getAllBooks(),
    retry: false,
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="book/:id" element={<Book />} />

        <Route element={<AdminRouter />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<BookList />} />
            <Route path="users" element={<UserList />} />
            <Route path="genres" element={<GenreList />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="books/update/:id" element={<UpdateBook />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
