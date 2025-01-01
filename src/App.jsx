import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import History from "./pages/History";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import ProtectedLanding from "./components/ProtectedLanding";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<ProtectedLanding />}>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Home />}>
              <Route path="reservations" element={<Reservations />} />
              <Route path="history" element={<History />} />
              <Route path="reviews" element={<Reviews />} />

              <Route path="users/:profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
