import { useRouter } from "next/router";
import { FlashcardList, StudyOptions } from "@/types";

interface PrepareStateProps {
  list: FlashcardList;
  studyOptions: StudyOptions;
  onSetStudyOptions: (options: StudyOptions) => void;
  onStartStudy: () => void;
}

export default function PrepareState({
  list,
  studyOptions,
  onSetStudyOptions,
  onStartStudy,
}: PrepareStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {list.title}
            </h1>
            <p className="text-gray-600">
              {list.cards.length} cards • Configure your study options
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Shuffle Orders</h3>
                <p className="text-sm text-gray-500">
                  Randomize the order of cards
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={studyOptions.shuffleOrders}
                  onChange={(e) =>
                    onSetStudyOptions({
                      ...studyOptions,
                      shuffleOrders: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Flipped Mode</h3>
                <p className="text-sm text-gray-500">
                  Show back first, front as answer
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={studyOptions.flipped}
                  onChange={(e) =>
                    onSetStudyOptions({
                      ...studyOptions,
                      flipped: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-gray-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={onStartStudy}
              className="flex-1 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}