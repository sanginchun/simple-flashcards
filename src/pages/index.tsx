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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl card-shadow-lg border border-white/20 dark:border-slate-700/50 p-8 md:p-12">
          <HomeHeader />

          <div className="space-y-8">
            <CreateNewButton />

            <SavedLists
              savedLists={savedLists}
              onDeleteList={handleDeleteList}
              onAccessList={handleAccessList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
