export function Tarefa({ tarefa, onUpdate, onDelete, disabled }) {
  function handleConcluidaChange(evt) {
    onUpdate({ ...tarefa, concluida: !tarefa.concluida });
  }

  return (
    <li>
      {tarefa.descricao}{" "}
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={handleConcluidaChange}
        disabled={disabled}
      />
      <button
        style={{ color: "red" }}
        onClick={() => onDelete(tarefa)}
        disabled={disabled}
      >
        🗑
      </button>
    </li>
  );
}
