"use client";

import { addTarefa, getTarefas } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function ListaDeTarefas() {
  const [descricao, setDescricao] = useState("");
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });
  const mutation = useMutation({
    mutationFn: addTarefa,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      setDescricao("");
    },
    onError: (error) => {
      alert(
        "Servidor indiponível no momento. Tente novamente mais tarde. Erro: " +
          error.message,
      );
    },
  });
  function handleAdicionarTarefa() {
    if (!descricao) {
      alert("Digite uma descrição");
      return;
    }
    mutation.mutate(descricao);
  }

  return (
    <>
      <Link href="/">Home</Link>
      <br />
      {isError && (
        <>
          <h2>Query Error: {error.message}</h2> <hr />{" "}
        </>
      )}
      {mutation.isError && (
        <>
          <h2>Mutation Error: {mutation.error.message}</h2> <hr />{" "}
        </>
      )}
      <h1>
        Lista de Tarefas {isLoading && "(carregando...)"}{" "}
        {isFetching && "[buscando...]"}
      </h1>
      <hr />
      <p>
        <input
          placeholder="Digite a descrição da tarefa"
          value={descricao}
          onChange={(evt) => setDescricao(evt.target.value)}
        />
        <button onClick={handleAdicionarTarefa} disabled={mutation.isPending}>
          Adicionar
        </button>
      </p>
      <hr />
      <ol>
        {data?.map((tarefa) => (
          <li key={tarefa.objectId}>
            {tarefa.descricao} ({`${tarefa.concluida}`})
          </li>
        ))}
      </ol>
    </>
  );
}
