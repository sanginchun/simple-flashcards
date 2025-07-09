import Link from "next/link";

export default function CreateNewButton() {
  return (
    <Link
      href="/create"
      className="group relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 text-center block text-lg shadow-lg hover:shadow-xl transform focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 overflow-hidden"
    >
      <span className="relative flex items-center justify-center gap-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Flashcard Set
      </span>
    </Link>
  );
}
