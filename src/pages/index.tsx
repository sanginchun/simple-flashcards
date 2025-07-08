import { useSavedListsStore } from "../stores/savedListsStore";
import HomeHeader from "@/components/home/HomeHeader";
import CreateNewButton from "@/components/home/CreateNewButton";
import SavedLists from "@/components/home/SavedLists";

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
        <HomeHeader />

        <div className="space-y-6">
          <CreateNewButton />

          <SavedLists
            savedLists={savedLists}
            onDeleteList={handleDeleteList}
            onAccessList={handleAccessList}
          />
        </div>
      </div>
    </div>
  );
}
