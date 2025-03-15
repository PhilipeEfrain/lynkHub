import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Link = {
  title: string;
  url: string;
};

export default function UsernamePage() {
  const router = useRouter();
  const { username } = router.query;
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchLinks = async () => {
      try {
        const userRef = doc(db, "users", String(username));
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("Usuário não encontrado.");
          return;
        }

        setLinks(userSnap.data().links || []);
      } catch (err) {
        setError("Erro ao carregar os links.");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [username]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">@{username}</h1>
      <div className="mt-4 w-full max-w-md">
        {links.length > 0 ? (
          links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-3 my-2 text-center text-white bg-blue-500 rounded-lg"
            >
              {link.title}
            </a>
          ))
        ) : (
          <p>Nenhum link disponível.</p>
        )}
      </div>
    </div>
  );
}
