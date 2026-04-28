import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export default function App() {
  const GET_DATA = gql`
    query {
      service {
        id
        title
        description
        status
        createdAt
      }
    }
  `;
  type Service = {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
  };

  type Data = {
    service: Service[];
  };

  const { data, error, loading } = useQuery<Data>(GET_DATA);

  if (loading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro ao carregar</p>;

 return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Ordens de Serviço
        </h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => console.log("ir para criação")}
        >
          + Novo Serviço
        </button>
      </div>

      {/* Lista */}
      <div className="bg-white rounded-xl shadow">
        {data?.service.length === 0 ? (
          <p className="p-6 text-gray-500">
            Nenhum serviço encontrado
          </p>
        ) : (
          <ul>
            {data?.service.map((service) => (
              <li
                key={service.id}
                className="border-b last:border-none p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Criado em:{" "}
                      {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      service.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
