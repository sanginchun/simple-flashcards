import { useEffect } from "react";
import { useRouter } from "next/router";
import { decodeListFromUrl } from "@/utils/urlData";
import { useStudyStore } from "../stores/studyStore";
import { useSavedListsStore } from "../stores/savedListsStore";
import LoadingState from "@/components/view/LoadingState";
import EmptyState from "@/components/view/EmptyState";
import PrepareState from "@/components/view/PrepareState";
import CompleteState from "@/components/view/CompleteState";
import StudyView from "@/components/view/StudyView";

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
    startIncorrectOnlyStudy,
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
    return <LoadingState />;
  }

  if (list.cards.length === 0) {
    return <EmptyState />;
  }

  // Show prepare state
  if (isPreparing) {
    return (
      <PrepareState
        list={list}
        studyOptions={session.options}
        onSetStudyOptions={setStudyOptions}
        onStartStudy={startStudy}
      />
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
      <CompleteState
        session={session}
        percentage={percentage}
        onRestart={handleRestart}
        onStartIncorrectOnly={startIncorrectOnlyStudy}
      />
    );
  }

  if (!currentCard) {
    return <LoadingState />;
  }

  return (
    <StudyView
      list={list}
      session={session}
      studyCardsLength={studyCards.length}
      currentCard={currentCard}
      progress={progress}
      isListSaved={isListSaved(list.id)}
      onFlip={handleFlip}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSaveToMyLists={handleSaveToMyLists}
    />
  );
}
