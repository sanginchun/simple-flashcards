import { useEffect } from "react";
import { useRouter } from "next/router";
import { decodeListFromUrl } from "@/utils/urlData";
import { useStudyStore } from "../stores/studyStore";
import { useSavedListsStore } from "../stores/savedListsStore";

export default function ViewPage() {
  const router = useRouter();
  const {
    list,
    session,
    isComplete,
    isPreparing,
    studyCards,
    setList,
    setStudyOptions,
    startStudy,
    flipCard,
    answerCard,
    nextCard,
    previousCard,
    restart,
    getCurrentCard,
    getProgress,
    getPercentage,
  } = useStudyStore();

  const { saveFlashcardList, isListSaved } = useSavedListsStore();

  useEffect(() => {
    // Get hash from URL instead of query parameters
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      try {
        // Decode URL-encoded data first
        const decodedHash = decodeURIComponent(hash);
        const decodedList = decodeListFromUrl(decodedHash);
        if (decodedList) {
          setList(decodedList);
        } else {
          console.warn("Failed to decode URL data, redirecting to home");
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding URL data:", error);
        router.push("/");
      }
    } else {
      // No hash data, redirect to home
      router.push("/");
    }
  }, [router, router.asPath, setList]); // Listen to asPath changes to catch hash changes

  if (!list) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">
            If this takes too long, the flashcard data might be invalid.
          </p>
        </div>
      </div>
    );
  }

  if (list.cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Flashcards
          </h1>
          <p className="text-gray-600 mb-6">This flashcard set is empty.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Show prepare state
  if (isPreparing) {
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
                    checked={session.options.shuffleOrders}
                    onChange={(e) =>
                      setStudyOptions({
                        ...session.options,
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
                    checked={session.options.flipped}
                    onChange={(e) =>
                      setStudyOptions({
                        ...session.options,
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
                onClick={startStudy}
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

  const currentCard = getCurrentCard();
  const progress = getProgress();

  const handleFlip = () => {
    flipCard();
  };

  const handleAnswer = (correct: boolean) => {
    if (!session.showBack) {
      alert("Please flip the card to see the answer first!");
      return;
    }
    answerCard(correct);
  };

  const handleRestart = () => {
    restart();
  };

  const handlePrevious = () => {
    previousCard();
  };

  const handleNext = () => {
    nextCard();
  };

  const handleSaveToMyLists = () => {
    if (!list) return;

    try {
      saveFlashcardList(list);
      alert("Flashcard set saved to My Lists!");
    } catch {
      alert("Error saving to My Lists.");
    }
  };

  if (isComplete) {
    const percentage = getPercentage();

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
          </div>

          <div className="space-y-4">
            <button
              onClick={handleRestart}
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Study Again
            </button>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
            <div className="flex gap-2">
              {list && !isListSaved(list.id) && (
                <button
                  onClick={handleSaveToMyLists}
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
                {session.currentIndex + 1} / {studyCards.length}
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

        {/* Flashcard */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center min-h-[200px] flex items-center justify-center">
            <div className="w-full">
              <div className="text-lg text-gray-900 leading-relaxed">
                {currentCard &&
                  (() => {
                    const { flipped } = session.options;
                    const { showBack } = session;

                    if (flipped) {
                      return showBack ? currentCard.front : currentCard.back;
                    } else {
                      return showBack ? currentCard.back : currentCard.front;
                    }
                  })()}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleFlip}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {(() => {
                const { showBack } = session;

                return showBack ? "Show Question" : "Show Answer";
              })()}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevious}
              disabled={session.currentIndex === 0}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Card {session.currentIndex + 1} of {studyCards.length}
            </div>

            <button
              onClick={handleNext}
              disabled={session.currentIndex === studyCards.length - 1}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>

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
      </div>
    </div>
  );
}
