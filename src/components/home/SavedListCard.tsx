import Link from "next/link";
import { SavedList } from "@/types";

interface SavedListCardProps {
  list: SavedList;
  onDelete: (id: string) => void;
  onAccess: (id: string) => void;
}

export default function SavedListCard({
  list,
  onDelete,
  onAccess,
}: SavedListCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 truncate">{list.title}</h3>
        <button
          onClick={() => onDelete(list.id)}
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
          onClick={() => onAccess(list.id)}
          className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors text-center"
        >
          Study
        </Link>
        <Link
          href={`/create#${encodeURIComponent(list.encodedData)}`}
          onClick={() => onAccess(list.id)}
          className="flex-1 bg-gray-600 text-white text-sm py-2 px-3 rounded hover:bg-gray-700 transition-colors text-center"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}