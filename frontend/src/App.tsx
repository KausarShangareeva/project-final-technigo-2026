import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import SuggestProject from "./pages/SuggestProject";
import FeedbackPage from "./pages/Feedback";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes - without layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Routes with layout */}
          <Route element={<RootLayout />}>
            {/* Public routes */}
            <Route index element={<Home />} />
            <Route path="suggest-project" element={<SuggestProject />} />
            <Route path="feedback" element={<FeedbackPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="dashboard"
                element={<Navigate to="/workspace" replace />}
              />
              <Route path="workspace" element={<Workspace />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
