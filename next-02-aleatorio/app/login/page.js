"use client";

import { userLogin } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStorage } from "@/zustand";

export default function Login() {
  const router = useRouter();
  const setLoggedUser = useUserStorage((state) => state.setLoggedUser);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      console.log("user data received from back4app:", user, data);
      setLoggedUser(data);
      router.replace("/");
    },
    onError: (error) => {
      alert("Erro de Login. Erro: " + error.message);
    },
  });

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!user.username || !user.password) {
      alert("Preencha todos os campos");
      return;
    }
    loginMutation.mutate(user);
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
          Senha:{" "}
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <button type="submit">Login</button>{" "}
          <button type="button" onClick={() => router.replace("/")}>
            Cancelar
          </button>
        </p>
      </form>
    </div>
  );
}
