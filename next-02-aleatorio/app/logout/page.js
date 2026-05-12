"use client";

import { userLogout } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserStorage } from "@/zustand";

export default function SignUp() {
  const router = useRouter();
  const { loggedUser, setLoggedUser } = useUserStorage((state) => state);

  const logoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      console.log("user logged out");
      setLoggedUser(null);
      router.replace("/");
    },
    onError: (error) => {
      alert(
        "Servidor indiponível no momento. Tente novamente mais tarde. Erro: " +
          error.message,
      );
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    logoutMutation.mutate(loggedUser.sessionToken);
  };

  return (
    <div>
      <h1>Log Out</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <button type="submit">Confirmar</button>{" "}
          <button type="button" onClick={() => router.replace("/")}>
            Cancelar
          </button>
        </p>
      </form>
    </div>
  );
}
