"use client";

import GeradorAleatorio from "@/components/GeradorAleatorio";
import GeradorTextoAleatorio from "@/components/GeradorTextoAleatorio";
import { useTaskFilter } from "@/zustand";
import Link from "next/link";
//import styles from "./page.module.css";

export default function Home() {
  const filtrarConcluidas = useTaskFilter((state) => state.filtrarConcluidas);
  return (
    <div>
      <Link href="/tarefas">Lista de Tarefas</Link> (Filtro ativado:{" "}
      {filtrarConcluidas ? "Sim" : "Não"})
      <hr />
      <GeradorAleatorio />
      <hr />
      <GeradorAleatorio />
      <hr />
      <GeradorTextoAleatorio>Gerador Texto 1</GeradorTextoAleatorio>
      <hr />
      <GeradorTextoAleatorio>Gerador Texto 2</GeradorTextoAleatorio>
    </div>
  );
}
