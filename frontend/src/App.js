import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

// Import Components
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboards/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Protected Route for /dashboard, where the role determines which dashboard to show */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
