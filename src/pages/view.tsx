import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FlashcardList, StudySession } from "@/types";
import { decodeListFromUrl, generateShareableUrl } from "@/utils/urlData";
import { saveFlashcardList, getSavedLists } from "@/utils/savedLists";

export default function ViewPage() {
  const router = useRouter();
  const [list, setList] = useState<FlashcardList | null>(null);
  const [session, setSession] = useState<StudySession>({
    currentIndex: 0,
    showBack: false,
    correctAnswers: 0,
    totalAnswered: 0,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isListSaved, setIsListSaved] = useState(false);

  useEffect(() => {
    // Get hash from URL instead of query parameters
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      try {
        const decodedList = decodeListFromUrl(hash);
        if (decodedList) {
          setList(decodedList);

          // Check if this list is already saved
          const savedLists = getSavedLists();
          const isSaved = savedLists.some(
            (saved) => saved.id === decodedList.id
          );
          setIsListSaved(isSaved);
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
  }, [router, router.asPath]); // Listen to asPath changes to catch hash changes

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

  const currentCard = list.cards[session.currentIndex];
  const progress = ((session.currentIndex + 1) / list.cards.length) * 100;

  const handleFlip = () => {
    setSession((prev) => ({ ...prev, showBack: !prev.showBack }));
  };

  const handleAnswer = (correct: boolean) => {
    if (!session.showBack) {
      alert("Please flip the card to see the answer first!");
      return;
    }

    setSession((prev) => ({
      ...prev,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalAnswered: prev.totalAnswered + 1,
      showBack: false,
    }));

    if (session.currentIndex + 1 >= list.cards.length) {
      setIsComplete(true);
    } else {
      setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    }
  };

  const handleRestart = () => {
    setSession({
      currentIndex: 0,
      showBack: false,
      correctAnswers: 0,
      totalAnswered: 0,
    });
    setIsComplete(false);
  };

  const handlePrevious = () => {
    if (session.currentIndex > 0) {
      setSession((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
        showBack: false,
      }));
    }
  };

  const handleNext = () => {
    if (session.currentIndex < list.cards.length - 1) {
      setSession((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        showBack: false,
      }));
    }
  };

  const handleSaveToMyLists = () => {
    if (!list) return;

    try {
      const viewUrl = generateShareableUrl(list, "view");
      const editUrl = generateShareableUrl(list, "create");

      saveFlashcardList(list, viewUrl, editUrl);
      setIsListSaved(true);
      alert("Flashcard set saved to My Lists!");
    } catch {
      alert("Error saving to My Lists.");
    }
  };

  if (isComplete) {
    const percentage = Math.round(
      (session.correctAnswers / session.totalAnswered) * 100
    );

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
              {!isListSaved && (
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
                {session.currentIndex + 1} / {list.cards.length}
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
              <div className="text-sm text-gray-500 mb-4">
                {session.showBack ? "Back" : "Front"}
              </div>
              <div className="text-lg text-gray-900 leading-relaxed">
                {session.showBack ? currentCard.back : currentCard.front}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleFlip}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {session.showBack ? "Show Front" : "Show Answer"}
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
              Card {session.currentIndex + 1} of {list.cards.length}
            </div>

            <button
              onClick={handleNext}
              disabled={session.currentIndex === list.cards.length - 1}
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
