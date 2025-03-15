"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, setDoc, getDoc, query, collection, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DashboardContent from "@/dashboard/DashboardContent";


export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>(""); // Novo state para guardar o userId
  const [name, setName] = useState(""); // Valor para o input (controlado)
  const [userName, setUserName] = useState(""); // Nome salvo no Firestore
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid); // Armazena o UID em um state separado
        await loadUserName(currentUser.uid);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const loadUserName = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const savedName = docSnap.data()?.username || "";
        setUserName(savedName);
        setName(savedName); // Preenche o input com o nome salvo
      }
    } catch (error) {
      console.error("Erro ao carregar nome:", error);
    }
  };

  const handleNameChange = async () => {
    console.log(userId)
    if (!name.trim()) {
      alert("Por favor, insira um nome válido.");
      return;
    }

    // Verifica se o nome já está em uso por outro usuário
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", name)
      );
      const querySnapshot = await getDocs(q);

      // Se encontrar algum documento com o nome e o ID for diferente do usuário atual
      if (!querySnapshot.empty && querySnapshot.docs[0].id !== userId) {
        alert("Nome de usuário já está em uso. Por favor, escolha outro.");
        return;
      }
    } catch (error) {
      console.error("Erro na verificação de nome:", error);
      alert("Erro ao verificar o nome. Tente novamente.");
      return;
    }

    try {
      if (userId) {
        const userRef = doc(db, "users", userId);
        // Usa setDoc com merge para criar ou atualizar o documento
        await setDoc(userRef, { username: name }, { merge: true });
        setUserName(name);
        alert("Nome salvo com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o nome:", error);
      alert("Erro ao salvar o nome. Tente novamente.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">
          Bem-vindo, <span className="font-semibold">{user?.email}</span>!
        </p>

        <div className="mt-4">
          <h2 className="text-lg font-medium">Nome: {userName || "Não definido"}</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleNameChange}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Salvar Nome
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>

      <div className="mt-16 bg-white p-6 rounded-lg shadow-lg">
        <DashboardContent />
      </div>
    </div>
  );
}
