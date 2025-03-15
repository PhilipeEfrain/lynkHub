import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const addLink = async (url: string, title: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    await addDoc(collection(db, "links"), {
      userId: user.uid,
      title,
      url,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao adicionar link:", error);
    throw new Error("Erro ao adicionar link.");
  }
};

export const getLinks = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const linksRef = collection(db, "links");
    // Filtra os documentos onde o campo userId é igual ao UID do usuário
    const q = query(linksRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const links = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      title: doc.data().title,
    }));
    return links;
  } catch (error) {
    console.error("Erro ao buscar links:", error);
    throw error;
  }
};


export const deleteLink = async (id: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const linkDocRef = doc(db, "links", id);
    await deleteDoc(linkDocRef);
  } catch (error) {
    console.error("Erro ao excluir link: ", error);
    throw error;
  }
};
