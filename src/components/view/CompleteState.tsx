import { useRouter } from "next/router";
import { StudySession } from "@/types";

interface CompleteStateProps {
  session: StudySession;
  percentage: number;
  onRestart: () => void;
  onStartIncorrectOnly: () => void;
}

export default function CompleteState({
  session,
  percentage,
  onRestart,
  onStartIncorrectOnly,
}: CompleteStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Study Complete!
        </h1>
        <div className="mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {percentage}%
          </div>
          <p className="text-gray-600">
            You got {session.correctAnswers} out of {session.totalAnswered}{" "}
            correct
          </p>
          {session.incorrectCards.length > 0 && (
            <p className="text-sm text-red-600 mt-2">
              {session.incorrectCards.length} card
              {session.incorrectCards.length === 1 ? "" : "s"} need
              {session.incorrectCards.length === 1 ? "s" : ""} more practice
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Study Again
          </button>
          {session.incorrectCards.length > 0 && (
            <button
              onClick={onStartIncorrectOnly}
              className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Study Incorrect Only ({session.incorrectCards.length} cards)
            </button>
          )}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}