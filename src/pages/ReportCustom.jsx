import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportCustom() {
  const { id } = useParams();
  const [fields, setFields] = useState("");
  const [result, setResult] = useState(null);

  const generate = async () => {
    try {
      const res = await api.post(`/projects/${id}/reports/custom`, {
        fields: fields.split(","),
      });
      setResult(res.data);
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Relatório Customizado</h1>

      <input
        value={fields}
        onChange={(e) => setFields(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Campos separados por vírgula"
      />

      <button onClick={generate} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Gerar
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </Layout>
  );
}
