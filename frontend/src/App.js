import "./App.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useAuth } from "./context/AuthContext";
import { useEffect, useRef } from "react";

function App() {
  const { login } = useAuth();
  const { data, isLoading } = useCurrentUser();

  useEffect(() => {
    if (data?.user) {
      login(data.user);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
