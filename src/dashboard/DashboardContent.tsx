"use client"; // Necessário para utilizar hooks no App Router

import { handleAddLink, handleDeleteLink, handleGetLinks } from "@/lib/linksService";
import { useEffect, useState } from "react";

export default function DashboardContent() {
  // Estado para armazenar os links do usuário
  const [links, setLinks] = useState<{ id: string; title: string; url: string }[]>([]);
  // Estado para armazenar os dados do novo link a ser adicionado
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  // Busca os links quando o componente é montado
  useEffect(() => {
    const fetchLinks = async () => {
      const data = await handleGetLinks();
      setLinks(data);
    };
    fetchLinks();
  }, []);

  // Função para adicionar um novo link
  const handleAdd = async () => {
    const message = await handleAddLink(newLink.url, newLink.title);
    if (message.includes("sucesso")) {
      // Atualiza a lista de links
      const data = await handleGetLinks();
      setLinks(data);
      // Limpa os campos do formulário
      setNewLink({ title: "", url: "" });
    } else {
      alert(message);
    }
  };

  // Função para excluir um link
  const handleDelete = async (id: string) => {
    const message = await handleDeleteLink(id);
    if (message.includes("sucesso")) {
      // Atualiza a lista de links
      const data = await handleGetLinks();
      setLinks(data);
    } else {
      alert(message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gerencie seus links</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Título"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">
          Adicionar
        </button>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.id} className="flex justify-between items-center border-b py-2">
            <a href={link.url.startsWith("http") ? link.url : `http://${link.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {link.title}
            </a>
            <button onClick={() => handleDelete(link.id)} className="bg-red-500 text-white px-2 py-1">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
