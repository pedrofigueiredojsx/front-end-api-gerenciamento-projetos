import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportTasks() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get(`/projects/${id}/reports/tasks`).then((res) => {
      setReport(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Relatório de Tarefas</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(report, null, 2)}</pre>
    </Layout>
  );
}
