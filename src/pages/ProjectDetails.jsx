import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/projects/${id}`);
      const data = response.data.data; 
      setProject(data);
      setTasks(data.tasks || []);
      setReports(data.reports || []);
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <p className="text-red-600 text-center mt-10">Projeto não encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-gray-700">{project.description}</p>

        {/* Abas */}
        <div className="flex gap-4 mt-6 border-b border-gray-300">
          {["details", "stats", "tasks", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 font-semibold ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "details" && "Detalhes"}
              {tab === "stats" && "Estatísticas"}
              {tab === "tasks" && "Tarefas"}
              {tab === "reports" && "Relatórios"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm font-medium">Status</p>
                <p className="text-xl font-semibold mt-1">{project.status}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm font-medium">Data de Início</p>
                <p className="text-xl font-semibold mt-1">{project.start_date}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm font-medium">Data de Fim</p>
                <p className="text-xl font-semibold mt-1">{project.end_date || "—"}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm font-medium">Orçamento</p>
                <p className="text-xl font-semibold mt-1">
                  {project.budget ? `R$ ${project.budget}` : "—"}
                </p>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700">Progresso: {project.progress}% concluído</p>
              <div className="mt-3 w-full bg-gray-200 h-3 rounded-lg overflow-hidden">
                <div
                  className="bg-blue-600 h-3"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-gray-600">
                Total de membros: {project.team_count || 1}
              </p>
            </div>
          )}

          {activeTab === "tasks" && (
            <div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Nova Task
              </button>

              {showTaskForm && (
                <TaskForm
                  projectId={project.id}
                  onSuccess={(newTask) => {
                    handleAddTask(newTask);
                    setShowTaskForm(false);
                  }}
                  onCancel={() => setShowTaskForm(false)}
                />
              )}

              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <p className="font-semibold">{task.name}</p>
                      <p className="text-gray-600 text-sm">{task.status}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nenhuma task encontrada.</p>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <button
                onClick={() => alert("Gerar relatório via API Jasper Studio")}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Gerar Relatório
              </button>

              {reports.length > 0 ? (
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <p className="font-semibold">{report.title || report.name}</p>
                      <p className="text-gray-600 text-sm">
                        {report.description || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nenhum relatório disponível.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
