"use client"; // Necessário para usar useState e useEffect

import { useState } from "react";
import { useRouter } from "next/router" // Para App Router (useRouter em vez de useHistory)
import { auth } from "@/lib/firebase"; // Certifique-se de importar corretamente sua instância do Firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Para navegação

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Enviar e-mail de verificação
      await sendEmailVerification(user);

      alert("Conta criada! Verifique seu e-mail antes de fazer login.");
      router.push("/login"); // Redireciona para o login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Criar Conta</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Já tem uma conta? <a href="/login" className="text-blue-500">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
