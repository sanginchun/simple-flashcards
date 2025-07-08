import { StudySession } from "@/types";

interface StudyNavigationProps {
  session: StudySession;
  studyCardsLength: number;
  onPrevious: () => void;
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}

export default function StudyNavigation({
  session,
  studyCardsLength,
  onPrevious,
  onNext,
  onAnswer,
}: StudyNavigationProps) {
  const handleAnswer = (correct: boolean) => {
    if (!session.showBack) {
      alert("Please flip the card to see the answer first!");
      return;
    }
    onAnswer(correct);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onPrevious}
          disabled={session.currentIndex === 0}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          Card {session.currentIndex + 1} of {studyCardsLength}
        </div>

        <button
          onClick={onNext}
          disabled={
            session.currentIndex === studyCardsLength - 1 ||
            !session.currentCardAnswered
          }
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Study Progress Hint */}
      {!session.currentCardAnswered &&
        session.currentIndex < studyCardsLength - 1 && (
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              {session.showBack
                ? "Check correct or incorrect"
                : "Flip the card and check answer"}
            </p>
          </div>
        )}

      {/* Answer Buttons */}
      {session.showBack && (
        <div className="flex gap-4 justify-center pt-4 border-t">
          <button
            onClick={() => handleAnswer(false)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Incorrect
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Correct
          </button>
        </div>
      )}
    </div>
  );
}