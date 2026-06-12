import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ChangePassword from "./pages/ChangePassword";
import FolderPage from "./pages/FolderPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/folder/:folderId"
  element={<FolderPage />}
/>

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
     
     <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
     <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/reset-password/:uid/:token"
  element={
    <ResetPassword />
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;