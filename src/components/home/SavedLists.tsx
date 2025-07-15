import { SavedList } from "@/types";
import SavedListCard from "./SavedListCard";

interface SavedListsProps {
  savedLists: SavedList[];
  onDeleteList: (id: string) => void;
  onAccessList: (id: string) => void;
}

export default function SavedLists({
  savedLists,
  onDeleteList,
  onAccessList,
}: SavedListsProps) {
  if (savedLists.length === 0) {
    return null;
  }

  const sortedLists = savedLists.sort(
    (a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime()
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
        My Lists
      </h2>
      <div className="space-y-3">
        {sortedLists.map((list) => (
          <SavedListCard
            key={list.id}
            list={list}
            onDelete={onDeleteList}
            onAccess={onAccessList}
          />
        ))}
      </div>
    </div>
  );
}
