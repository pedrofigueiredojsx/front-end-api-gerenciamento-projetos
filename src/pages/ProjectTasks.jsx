import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ProjectTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = async () => {
    try {
      const res = await api.get(`/projects/${id}/tasks`);
      setTasks(res.data.data);
    } catch (err) {
      console.error("Erro ao carregar tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.trim()) return;

    try {
      await api.post(`/projects/${id}/tasks`, {
        name: newTask,
      });
      setNewTask("");
      loadTasks();
    } catch (err) {
      console.error("Erro ao criar task:", err);
    }
  };

  if (loading) return <Layout><p>Carregando tarefas...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Tarefas</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask} className="bg-blue-600 text-white px-4 rounded">
          Criar
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="p-3 bg-white shadow rounded">
            {t.name}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
