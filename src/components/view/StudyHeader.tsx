import { useRouter } from "next/router";
import { FlashcardList, StudySession } from "@/types";

interface StudyHeaderProps {
  list: FlashcardList;
  session: StudySession;
  studyCardsLength: number;
  progress: number;
  isListSaved: boolean;
  onSaveToMyLists: () => void;
}

export default function StudyHeader({
  list,
  session,
  studyCardsLength,
  progress,
  isListSaved,
  onSaveToMyLists,
}: StudyHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
        <div className="flex gap-2">
          {list && !isListSaved && (
            <button
              onClick={onSaveToMyLists}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Save to My Lists
            </button>
          )}
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Home
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>
            {session.currentIndex + 1} / {studyCardsLength}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="text-sm text-gray-600">
        Score: {session.correctAnswers} / {session.totalAnswered} correct
      </div>
    </div>
  );
}