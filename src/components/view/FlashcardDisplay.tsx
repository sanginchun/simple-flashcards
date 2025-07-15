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
  const { flipped } = session.options;
  const { showBack } = session;

  const frontText = flipped ? currentCard.back : currentCard.front;
  const backText = flipped ? currentCard.front : currentCard.back;
  const isShowingBack = showBack;

  const getFlipButtonText = () => {
    return isShowingBack ? "Show Question" : "Show Answer";
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* 3D Flip Card Container - key forces remount on card change */}
      <div key={currentCard.id} className={`flip-card ${isShowingBack ? 'flipped' : ''}`}>
        <div className="flip-card-inner min-h-[300px] md:min-h-[350px]">
          {/* Front Side */}
          <div className="flip-card-front">
            <div className="bg-white dark:bg-slate-800 rounded-2xl card-shadow-lg p-8 h-full border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col h-full justify-between">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                      {frontText}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Question
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl card-shadow-lg p-8 h-full border border-indigo-200 dark:border-indigo-700">
              <div className="flex flex-col h-full justify-between">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                      {backText}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">
                    Answer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onFlip}
          className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {getFlipButtonText()}
          </span>
        </button>
      </div>
    </div>
  );
}