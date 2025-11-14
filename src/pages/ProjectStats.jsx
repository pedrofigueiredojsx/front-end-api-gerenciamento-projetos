import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ProjectStats() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [id]);

  const loadStats = async () => {
    try {
      const response = await api.get(`/projects/${id}/stats`);
      setStats(response.data);
    } catch (err) {
      console.error("Erro ao buscar stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><p>Carregando estatísticas...</p></Layout>;

  if (!stats) return <Layout><p className="text-red-600">Erro ao carregar estatísticas.</p></Layout>;

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Estatísticas do Projeto</h1>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(stats, null, 2)}</pre>
      </div>
    </Layout>
  );
}
