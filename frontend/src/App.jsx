import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnBoardPage from "./pages/OnBoardPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/call" element={<CallPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/onboarding" element={<OnBoardPage />} />
    </Routes>
  );
}

export default App;
