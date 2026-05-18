"use client";

import { currentUser, verificationEmailRequest } from "@/api";
import { useUserStorage } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function UserDetails() {
  const loggedUser = useUserStorage((state) => state.loggedUser);
  const queryClient = useQueryClient();

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => currentUser(loggedUser.sessionToken),
  });

  const mutation = useMutation({
    mutationFn: verificationEmailRequest,
    onSuccess: () => {
      alert("Verifique a sua caixa de e-mail para validar a conta.");
    },
    onError: (error) => {
      alert(
        "Servidor indiponível no momento. Tente novamente mais tarde. Erro: " +
          error.message,
      );
    },
  });

  return (
    <>
      <Link href="/">Home</Link>
      <br />
      {isError && (
        <>
          <h2>Query Error: {error.message}</h2> <hr />{" "}
        </>
      )}
      <h1>
        Detalhes do Usuário {isLoading && "(carregando...)"}{" "}
        {isFetching && "[buscando...]"}
      </h1>
      <hr />
      <button onClick={() => mutation.mutate(loggedUser.email)}>
        Verificar E-mail
      </button>
      <hr />
      <pre>{JSON.stringify(data ?? {}, null, 2)}</pre>
      <hr />
    </>
  );
}
