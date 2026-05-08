"use client";

import { userSignUp } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const signUpMutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      console.log("user data received from back4app:", user, data);
    },
    onError: (error) => {
      alert(
        "Servidor indiponível no momento. Tente novamente mais tarde. Erro: " +
          error.message,
      );
    },
  });

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signUpMutation.mutate(user);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Nome do usuário:{" "}
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </p>
        <p>
          Email:{" "}
          <input name="email" value={user.email} onChange={handleChange} />
        </p>
        <p>
          Senha:{" "}
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <button>Sign Up</button>
        </p>
      </form>
    </div>
  );
}
