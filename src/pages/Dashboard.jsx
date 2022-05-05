import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { db } from "../firebase/firebaseConfig";
export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, logOut } = useAuthContext();
  const getUsers = () => {
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let arr = [];
      Object.keys(data).map((item) => {
        arr.push({
          id: item,
          ...data[item],
        });
      });
      // console.log(arr)
      setUsers(arr);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return user ? (
    <div className="dashboard-container">
      <div className="users">
        <h1 className="title">Peoples</h1>
        <div className="user-card">
          <ol>
            {users.map((el) => (
              <li key={el?.id}>{el?.displayName ?? el?.email}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="main-content">
        <div className="messages">
          <div className="message">
            <p className="message-user">
              Admin <span className="message-time">5:20px</span>
            </p>
            <p className="message-text">Welcome to the chat app</p>
          </div>
        </div>
        <div className="message-footer">
          <input className="message-input" placeholder="Message" />
          <button className="message-btn">Send</button>
          <button className="message-btn">Send location</button>
        </div>
      </div>
      {/* <button onClick={() => logOut()}>Log Out</button> */}
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};
