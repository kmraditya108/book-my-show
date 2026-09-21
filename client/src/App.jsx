import React from "react";
import { Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UsersList from "./pages/UsersList";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import CreateTheatrePage from "./pages/CreateTheatrePage";
import ShowTheatresPage from "./pages/ShowTheatresPage";
import ProtectedLayout from "./components/ProtectedLayout";
import TheatreDetailsPage from "./pages/TheatreDetailsPage";

const App = () => {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/users-list" element={<UsersList />} />
    <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
    <Route element={<ProtectedLayout/>}>
      <Route path="/createTheatre" element={<CreateTheatrePage/>} />
      <Route path="/theatres" element={<ShowTheatresPage/>} />
      <Route path="/theatres/:theatreId" element={<TheatreDetailsPage/>} />
      TheatreDetailsPage
    </Route>
  </Routes>
}

export default App;