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
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, isLoading } = useAuth();
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
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
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnBoarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
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
    </div>
  );
}

export default App;
