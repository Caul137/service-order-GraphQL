import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const CREATE_SERVICE = gql`
  mutation CreateService($title: String!, $description: String!) {
    createService(title: $title, description: $description) {
      id
      title
    }
  }
`;

export default function NewOrder() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createService, { loading, error }] = useMutation(CREATE_SERVICE);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await createService({
        variables: {
          title,
          description,
        },
      });

    
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Nova Ordem de Serviço
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Troca de óleo"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva o serviço..."
            />
          </div>

          {/* Erro */}
          {error && (
            <p className="text-red-500 text-sm">
              Erro ao criar serviço
            </p>
          )}

          {/* Botões */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}