"use client";

import { getTarefas } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ListaDeTarefas() {
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  return (
    <>
      <Link href="/">Home</Link>
      <br />
      {isError && (
        <>
          <h2>Error: {error.message}</h2> <hr />{" "}
        </>
      )}
      <h1>
        Lista de Tarefas {isLoading && "(carregando...)"}{" "}
        {isFetching && "[buscando...]"}
      </h1>
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
