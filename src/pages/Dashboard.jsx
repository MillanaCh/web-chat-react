import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
export const Dashboard = () => {
  const { user, logOut } = useAuthContext();
  return user ? (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};
