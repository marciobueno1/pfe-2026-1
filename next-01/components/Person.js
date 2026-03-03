export default function Person({ name, height, birth_year }) {
  return (
    <li>
      {name} - {height < 150 ? <del>{height} cm</del> : `${height} cm`} -{" "}
      {birth_year}
    </li>
  );
}
