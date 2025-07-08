import { FlashcardList, StudySession, Flashcard } from "@/types";
import StudyHeader from "./StudyHeader";
import FlashcardDisplay from "./FlashcardDisplay";
import StudyNavigation from "./StudyNavigation";

interface StudyViewProps {
  list: FlashcardList;
  session: StudySession;
  studyCardsLength: number;
  currentCard: Flashcard;
  progress: number;
  isListSaved: boolean;
  onFlip: () => void;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSaveToMyLists: () => void;
}

export default function StudyView({
  list,
  session,
  studyCardsLength,
  currentCard,
  progress,
  isListSaved,
  onFlip,
  onAnswer,
  onNext,
  onPrevious,
  onSaveToMyLists,
}: StudyViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <StudyHeader
          list={list}
          session={session}
          studyCardsLength={studyCardsLength}
          progress={progress}
          isListSaved={isListSaved}
          onSaveToMyLists={onSaveToMyLists}
        />

        <FlashcardDisplay
          currentCard={currentCard}
          session={session}
          onFlip={onFlip}
        />

        <StudyNavigation
          session={session}
          studyCardsLength={studyCardsLength}
          onPrevious={onPrevious}
          onNext={onNext}
          onAnswer={onAnswer}
        />
      </div>
    </div>
  );
}