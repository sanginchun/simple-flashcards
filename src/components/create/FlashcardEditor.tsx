import { FlashcardList } from "@/types";
import FlashcardCard from "./FlashcardCard";

interface FlashcardEditorProps {
  list: FlashcardList;
  onAddCard: () => void;
  onUpdateCard: (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => void;
  onDeleteCard: (cardId: string) => void;
}

export default function FlashcardEditor({
  list,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
}: FlashcardEditorProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Flashcards ({list.cards.length})
        </h2>
        <button
          onClick={onAddCard}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {list.cards.map((card, index) => (
          <FlashcardCard
            key={card.id}
            card={card}
            index={index}
            onUpdateCard={onUpdateCard}
            onDeleteCard={onDeleteCard}
          />
        ))}

        {list.cards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No flashcards yet. Click &quot;Add Card&quot; to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}