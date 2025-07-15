import Link from "next/link";
import { SavedList } from "@/types";
import { Button } from "@headlessui/react";

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
        <h3 className="font-medium text-gray-900 dark:text-gray-200 truncate">
          {list.title}
        </h3>
        <Button
          onClick={() => onDelete(list.id)}
          className="text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-700 text-sm"
          title="Delete"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </div>
      <div className="text-sm text-gray-500 mb-3">
        {list.cardCount} cards • Last accessed{" "}
        {list.lastAccessed.toLocaleDateString()}
      </div>
      <div className="flex space-x-2">
        <Link
          href={`/view#${encodeURIComponent(list.encodedData)}`}
          onClick={() => onAccess(list.id)}
          className="flex-1 border border-indigo-700 bg-indigo-50 text-indigo-700 dark:bg-indigo-800 dark:text-slate-100 font-semibold text-sm py-2 px-3 rounded text-center"
        >
          Study
        </Link>
        <Link
          href={`/create#${encodeURIComponent(list.encodedData)}`}
          onClick={() => onAccess(list.id)}
          className="flex-1 border border-gray-700 text-gray-700 dark:text-slate-100 font-semibold text-sm py-2 px-3 rounded text-center"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
