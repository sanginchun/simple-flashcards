import Link from "next/link";

export default function CreateNewButton() {
  return (
    <Link
      href="/create"
      className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
    >
      Create New Flashcard Set
    </Link>
  );
}