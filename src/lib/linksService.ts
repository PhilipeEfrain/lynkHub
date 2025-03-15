import { addLink, getLinks, deleteLink } from "@/lib/firestore";

// Função para adicionar um link
export const handleAddLink = async (url: string, title: string) => {
  try {
    await addLink(url, title);
    return "Link adicionado com sucesso!";
  } catch (error) {
    console.error(error);
    return "Erro ao adicionar link!";
  }
};

// Função para buscar links
export const handleGetLinks = async () => {
  try {
    return await getLinks();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para excluir um link
export const handleDeleteLink = async (id: string) => {
  try {
    await deleteLink(id);
    return "Link excluído com sucesso!";
  } catch (error) {
    console.error(error);
    return "Erro ao excluir link!";
  }
};
