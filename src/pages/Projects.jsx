import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import ProjectForm from '../components/ProjectForm';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, [statusFilter]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const url =
        statusFilter === 'all'
          ? '/projects'
          : `/projects?status=${statusFilter}`;

      const response = await api.get(url);
      setProjects(response.data.data || response.data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os seus projetos</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Novo Projeto
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Criar Novo Projeto</h2>
            <ProjectForm
              onSuccess={() => {
                setShowForm(false);
                loadProjects();
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="planejamento">Planejamento</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="concluido">Concluído</option>
            <option value="pausado">Pausado</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">Nenhum projeto encontrado</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Criar Primeiro Projeto
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div
                    className="flex-1"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <h3 className="text-lg font-bold text-gray-900">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {project.status}
                      </span>

                      <span className="text-xs text-gray-600">
                        {project.team_count} membros
                      </span>

                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {project.progress}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 font-semibold ml-4"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
