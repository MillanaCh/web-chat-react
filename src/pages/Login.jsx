import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function Login() {
  const { signInWithEmail, signInWithGmail, user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("please enter email and password");
    } else {
      signInWithEmail({ email, password });
    }
  };
  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Join the chat room</h1>
        <form onSubmit={onSubmit}>
          <p className="label">Email</p>
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="label">Password</p>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn">Sign In</button>
        </form>
        <button
          type="submit"
          className="sign-gmail-btn"
          onClick={signInWithGmail}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
