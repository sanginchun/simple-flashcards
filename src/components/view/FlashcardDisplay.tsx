import { Flashcard, StudySession } from "@/types";

interface FlashcardDisplayProps {
  currentCard: Flashcard;
  session: StudySession;
  onFlip: () => void;
}

export default function FlashcardDisplay({
  currentCard,
  session,
  onFlip,
}: FlashcardDisplayProps) {
  const getDisplayText = () => {
    const { flipped } = session.options;
    const { showBack } = session;

    if (flipped) {
      return showBack ? currentCard.front : currentCard.back;
    } else {
      return showBack ? currentCard.back : currentCard.front;
    }
  };

  const getFlipButtonText = () => {
    const { showBack } = session;
    return showBack ? "Show Question" : "Show Answer";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
      <div className="text-center min-h-[200px] flex items-center justify-center">
        <div className="w-full">
          <div className="text-lg text-gray-900 leading-relaxed">
            {getDisplayText()}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onFlip}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {getFlipButtonText()}
        </button>
      </div>
    </div>
  );
}