interface FlashcardSetTitleProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export default function FlashcardSetTitle({
  title,
  onTitleChange,
}: FlashcardSetTitleProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Flashcard Set Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title for your flashcard set"
      />
    </div>
  );
}