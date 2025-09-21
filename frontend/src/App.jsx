import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnBoardPage from "./pages/OnBoardPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import PageLoader from "./components/PageLoader";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { authUser, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated && isOnBoarded ? (
            <HomePage />
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? (
            <SignUpPage />
          ) : (
            <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/call"
        element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/chat"
        element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/onboarding"
        element={
          isAuthenticated ? (
            !isOnBoarded ? (
              <OnBoardPage />
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
