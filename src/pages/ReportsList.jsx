import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportsList() {
  const { id } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await api.get(`/projects/${id}/reports`);
      setReports(res.data);
    } catch (err) {
      console.error("Erro ao carregar relatórios:", err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(reports, null, 2)}
      </pre>
    </Layout>
  );
}
