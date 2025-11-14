import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.get(`/projects/${id}/reports/team`).then((res) => {
      setTeam(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Relatório da Equipe</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(team, null, 2)}</pre>
    </Layout>
  );
}
