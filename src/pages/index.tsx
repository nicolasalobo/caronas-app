import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [passageiros, setPassageiros] = useState([]);

  useEffect(() => {
    const fetchPassageiros = async () => {
      const { data, error } = await supabase.from("passageiros").select("*");
      if (error) {
        console.error("Erro ao buscar passageiros:", error.message);
      } else {
        setPassageiros(data);
      }
    };

    fetchPassageiros();
  }, []);

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
      window.location.reload();
    }
  };

  const marcarPresenca = async (passageiroId: string, foi: boolean) => {
    const { error } = await supabase.from("presenca").insert([
      { passageiro_id: passageiroId, foi }
    ]);

    if (error) {
      console.error("Erro ao marcar presença:", error.message);
    } else {
      alert("Presença registrada!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Adicionar Passageiro</h1>
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
      
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Passageiros</h2>
        <ul>
          {passageiros.map((p: any) => (
            <li key={p.id} className="flex justify-between items-center p-2 border-b">
              {p.nome} - R$ {p.valor} 
              <div>
                <button onClick={() => marcarPresenca(p.id, true)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">✅</button>
                <button onClick={() => marcarPresenca(p.id, false)} className="bg-blue-500 text-white px-2 py-1 rounded">❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
