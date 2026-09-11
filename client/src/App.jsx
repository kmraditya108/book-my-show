import React from "react";
import { Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersList from "./pages/UsersList";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App = () => {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/users-list" element={<UsersList />} />
    <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
  </Routes>
}

export default App;