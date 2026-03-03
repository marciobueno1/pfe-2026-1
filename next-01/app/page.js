import Profile from "@/components/Profile";
import Person from "@/components/Person";
import { people } from "@/api";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Olá, Turma!
      <Profile />
      Exemplo de expressão: {5 ** 3}
      <hr />
      <h2>Star Wars People</h2>
      {people.map((person) => (
        <Person key={person.url} {...person} />
      ))}
    </div>
  );
}
