import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "X-Parse-Application-Id": "JYknWGUo6qYhDc3g8hvgQUvITZyz4KFAUttpAxVF",
    "X-Parse-REST-API-Key": "uyhRDxFMCkxfy4hBJavBNlu48oSRdLEmxxZGrog4",
  },
});
const tarefaURL = "/classes/Tarefa";

export async function getTarefas() {
  const response = await instance.get(tarefaURL);
  return response.data?.results;
}
