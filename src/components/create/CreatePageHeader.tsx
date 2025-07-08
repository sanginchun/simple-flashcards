import { useRouter } from "next/router";

interface CreatePageHeaderProps {
  hasUnsavedChanges: boolean;
  isListSaved: boolean;
  onSave: () => void;
  onAddToMyLists: () => void;
  onViewImmediately: () => void;
  onShare: () => void;
}

export default function CreatePageHeader({
  hasUnsavedChanges,
  isListSaved,
  onSave,
  onAddToMyLists,
  onViewImmediately,
  onShare,
}: CreatePageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Flashcards</h1>
        {hasUnsavedChanges && (
          <p className="text-sm text-orange-600 mt-1">You have unsaved changes</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onSave}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            hasUnsavedChanges
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!hasUnsavedChanges}
        >
          Save
        </button>
        {!isListSaved && (
          <button
            onClick={onAddToMyLists}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add to My Lists
          </button>
        )}
        <button
          onClick={onViewImmediately}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
        >
          View Immediately
        </button>
        <button
          onClick={onShare}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Share
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
}