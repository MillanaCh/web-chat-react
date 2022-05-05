import "./App.css";
import { AuthProvider } from "./context/authContext";
import AppRouter from "./router/AppRouter";
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
