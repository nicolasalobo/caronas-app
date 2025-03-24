import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("passageiros").insert([
      { nome, valor: parseFloat(valor) }
    ]);

    if (error) {
      alert("Erro ao adicionar passageiro: " + error.message);
    } else {
      alert("Passageiro adicionado com sucesso!");
      setNome("");
      setValor("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Adicionar Passageiro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Valor da Carona"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}