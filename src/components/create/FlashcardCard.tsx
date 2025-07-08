import { Flashcard } from "@/types";

interface FlashcardCardProps {
  card: Flashcard;
  index: number;
  onUpdateCard: (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => void;
  onDeleteCard: (cardId: string) => void;
}

export default function FlashcardCard({
  card,
  index,
  onUpdateCard,
  onDeleteCard,
}: FlashcardCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-500">
          Card {index + 1}
        </span>
        <button
          onClick={() => onDeleteCard(card.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Front
          </label>
          <textarea
            value={card.front}
            onChange={(e) => onUpdateCard(card.id, "front", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Question or prompt"
          />
          <p className="text-xs text-gray-500 mt-1">
            {card.front.length}/200 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Back
          </label>
          <textarea
            value={card.back}
            onChange={(e) => onUpdateCard(card.id, "back", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Answer or explanation"
          />
          <p className="text-xs text-gray-500 mt-1">
            {card.back.length}/200 characters
          </p>
        </div>
      </div>
    </div>
  );
}