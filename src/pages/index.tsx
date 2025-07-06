import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Flashcards
          </h1>
          <p className="text-gray-600">
            Create and study flashcards with shareable URLs
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/create"
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
          >
            Create New Flashcard Set
          </Link>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Or paste a shareable link to view existing flashcards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
