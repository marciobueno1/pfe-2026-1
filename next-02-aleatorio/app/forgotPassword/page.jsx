"use client";

import { requestPasswordReset } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStorage } from "@/zustand";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      console.log("user data received from back4app:", data);
      alert("Verifique o seu e-mail para resetar a sua senha.");
      router.replace("/");
    },
    onError: (error) => {
      alert("Erro de Esqueci a minha senha. Erro: " + error.message);
    },
  });

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email) {
      alert("Preencha o seu e-mail.");
      return;
    }
    mutation.mutate(email);
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <p>
          e-mail: <input name="email" value={email} onChange={handleChange} />
        </p>
        <p>
          <button type="submit">Enviar</button>{" "}
          <button type="button" onClick={() => router.replace("/")}>
            Cancelar
          </button>
        </p>
      </form>
    </div>
  );
}
