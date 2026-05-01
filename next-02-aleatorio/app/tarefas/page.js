"use client";

import { addTarefa, deleteTarefa, getTarefas, updateTarefa } from "@/api";
import { Tarefa } from "@/components/Tarefa";
import { useTaskFilter } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function ListaDeTarefas() {
  const [descricao, setDescricao] = useState("");
  const { filtrarConcluidas, toggleFiltrarConcluidas } = useTaskFilter(
    (state) => state,
  );
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });
  const addMutation = useMutation({
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
  const updateMutation = useMutation({
    mutationFn: updateTarefa,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (error) => {
      alert(
        "Servidor indiponível no momento. Tente novamente mais tarde. Erro: " +
          error.message,
      );
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTarefa,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
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
    addMutation.mutate(descricao);
  }
  function handleAtualizarTarefa(tarefa) {
    updateMutation.mutate(tarefa);
  }
  function handleRemoverTarefa(tarefa) {
    deleteMutation.mutate(tarefa);
  }

  let tarefas = data;
  if (data && filtrarConcluidas) {
    tarefas = data.filter((tarefa) => !tarefa.concluida);
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
      {addMutation.isError && (
        <>
          <h2>Mutation Error: {addMutation.error.message}</h2> <hr />{" "}
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
        <button
          onClick={handleAdicionarTarefa}
          disabled={addMutation.isPending}
        >
          Adicionar
        </button>
      </p>
      <hr />
      <p>
        Ocultar as tarefas concluídas{" "}
        <input
          type="checkbox"
          checked={filtrarConcluidas}
          onChange={toggleFiltrarConcluidas}
        />
      </p>
      <hr />
      <ol>
        {tarefas?.map((tarefa) => (
          <Tarefa
            key={tarefa.objectId}
            tarefa={tarefa}
            onUpdate={handleAtualizarTarefa}
            onDelete={handleRemoverTarefa}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          />
        ))}
      </ol>
    </>
  );
}
