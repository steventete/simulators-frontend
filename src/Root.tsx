import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import LoginLayout from "./layouts/LoginLayout.tsx";
import Login from "./components/login/Login.tsx";
import Register from "./components/login/Register.tsx";
import "./index.css";
import App from "./App.tsx";
import ProtectedRoute from "./layouts/ProtectedRoute.tsx";
import Me from "./pages/Me.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import TrlBrlCrl from "./pages/dashboard/simulators/TRLBRLCRL/TrlBrlCrl.tsx";
import Evaluations from "./pages/Evaluations.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        path="/dashboard"
        element={<ProtectedRoute children={<Dashboard />} />}
      />
      <Route
        path="/dashboard/evaluation/trl-brl-crl/:id"
        element={<ProtectedRoute children={<TrlBrlCrl />} />}
      />
      <Route
        path="/dashboard/project/:id/evaluations"
        element={<Evaluations />}
      />
      <Route
        path="/dashboard/profile"
        element={<ProtectedRoute children={<Me />} />}
      />
      
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);