"use client";

import GeradorAleatorio from "@/components/GeradorAleatorio";
import GeradorTextoAleatorio from "@/components/GeradorTextoAleatorio";
import { useTaskFilter, useUserStorage } from "@/zustand";
import Link from "next/link";
//import styles from "./page.module.css";

export default function Home() {
  const filtrarConcluidas = useTaskFilter((state) => state.filtrarConcluidas);
  const loggedUser = useUserStorage((state) => state.loggedUser);

  return (
    <div>
      <Link href="/tarefas">Lista de Tarefas</Link> (Filtro ativado:{" "}
      {filtrarConcluidas ? "Sim" : "Não"})
      <hr />
      <p>
        Usário logado:{" "}
        {loggedUser ? (
          <Link href="/userDetails">{loggedUser?.username}</Link>
        ) : (
          "Nenhum"
        )}
      </p>
      {!loggedUser ? (
        <>
          <Link href="/signup">Sign Up</Link>
          <br />
          <Link href="/login">Log In</Link>
          <br />
          <Link href="/forgotPassword">Reset Password</Link>
        </>
      ) : (
        <>
          <Link href="/logout">Log Out</Link>
          <hr />
        </>
      )}
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
