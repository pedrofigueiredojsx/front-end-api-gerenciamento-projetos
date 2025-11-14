import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportProject() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/projects/${id}/reports/project`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Relatório do Projeto</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </Layout>
  );
}
