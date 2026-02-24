import Profile from "@/components/Profile";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Olá, Turma!
      <Profile />
      <Profile />
      Exemplo de expressão: {5 ** 3}
    </div>
  );
}
