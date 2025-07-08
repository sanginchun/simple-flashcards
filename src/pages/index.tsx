import Link from "next/link";
import { useSavedListsStore } from "../stores/savedListsStore";

export default function Home() {
  const { savedLists, deleteSavedList, updateLastAccessed } =
    useSavedListsStore();

  const handleDeleteList = (id: string) => {
    deleteSavedList(id);
  };

  const handleAccessList = (id: string) => {
    updateLastAccessed(id);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">
            Create and study flashcards with shareable URLs
          </p>
        </div>

        <div className="space-y-6">
          <Link
            href="/create"
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
          >
            Create New Flashcard Set
          </Link>

          {savedLists.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                My Lists
              </h2>
              <div className="space-y-3">
                {savedLists
                  .sort(
                    (a, b) =>
                      b.lastAccessed.getTime() - a.lastAccessed.getTime()
                  )
                  .map((list) => (
                    <div
                      key={list.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {list.title}
                        </h3>
                        <button
                          onClick={() => handleDeleteList(list.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Delete"
                        >
                          ×
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {list.cardCount} cards • Last accessed{" "}
                        {list.lastAccessed.toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/view#${encodeURIComponent(list.encodedData)}`}
                          onClick={() => handleAccessList(list.id)}
                          className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors text-center"
                        >
                          Study
                        </Link>
                        <Link
                          href={`/create#${encodeURIComponent(list.encodedData)}`}
                          onClick={() => handleAccessList(list.id)}
                          className="flex-1 bg-gray-600 text-white text-sm py-2 px-3 rounded hover:bg-gray-700 transition-colors text-center"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
