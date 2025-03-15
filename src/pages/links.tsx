import Link from "next/link";

export default function Links() {
  return (
    <div>
      <h2>Meus Links</h2>
      <Link href="/add-link">
        <a>Adicionar novo link</a>
      </Link>
    </div>
  );
}
