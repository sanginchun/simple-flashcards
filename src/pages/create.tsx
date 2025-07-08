import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FlashcardList } from "@/types";
import {
  createEmptyList,
  createEmptyCard,
  addCardToList,
  updateCardInList,
  removeCardFromList,
  updateListTitle,
  validateCardText,
} from "@/utils/flashcards";
import {
  decodeListFromUrl,
  updateUrlWithList,
  generateShareableUrl,
} from "@/utils/urlData";
import { saveFlashcardList } from "@/utils/savedLists";

export default function CreatePage() {
  const router = useRouter();
  const [list, setList] = useState<FlashcardList>(createEmptyList());
  const [shareUrl, setShareUrl] = useState<string>("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Get hash from URL instead of query parameters
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      try {
        const decodedList = decodeListFromUrl(hash);
        if (decodedList) {
          setList(decodedList);
          setHasUnsavedChanges(false);
        } else {
          // If decoding fails, start with an empty list
          console.warn("Failed to decode URL data, starting with empty list");
          setList(createEmptyList());
        }
      } catch (error) {
        console.error("Error decoding URL data:", error);
        // Start with empty list if URL data is corrupted
        setList(createEmptyList());
      }
    }
  }, [router, router.asPath]); // Listen to asPath changes to catch hash changes

  const handleTitleChange = (title: string) => {
    const updatedList = updateListTitle(list, title);
    setList(updatedList);
    setHasUnsavedChanges(true);
  };

  const handleAddCard = () => {
    const newCard = createEmptyCard();
    const updatedList = addCardToList(list, newCard);
    setList(updatedList);
    setHasUnsavedChanges(true);
  };

  const handleUpdateCard = (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => {
    if (!validateCardText(value)) {
      alert("Text too long! Please keep it under 200 characters.");
      return;
    }

    const updatedList = updateCardInList(list, cardId, { [field]: value });
    setList(updatedList);
    setHasUnsavedChanges(true);
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedList = removeCardFromList(list, cardId);
    setList(updatedList);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (!list.title.trim()) {
      alert("Please enter a title for your flashcard set!");
      return;
    }

    if (list.cards.length === 0) {
      alert("Please add at least one flashcard!");
      return;
    }

    // Check if any cards have empty fields
    const hasEmptyCards = list.cards.some(
      (card) => !card.front.trim() || !card.back.trim()
    );
    if (hasEmptyCards) {
      alert("Please fill in all flashcard fields before saving!");
      return;
    }

    try {
      updateUrlWithList(list, router);
      setHasUnsavedChanges(false);
      alert("Flashcard set saved successfully!");
    } catch {
      alert("Error saving flashcard set. It might be too large.");
    }
  };

  const handleShare = () => {
    if (!list.title.trim()) {
      alert("Please enter a title for your flashcard set!");
      return;
    }

    if (list.cards.length === 0) {
      alert("Please add some flashcards before sharing!");
      return;
    }

    // Check if any cards have empty fields
    const hasEmptyCards = list.cards.some(
      (card) => !card.front.trim() || !card.back.trim()
    );
    if (hasEmptyCards) {
      alert("Please fill in all flashcard fields before sharing!");
      return;
    }

    try {
      const url = generateShareableUrl(list);
      setShareUrl(url);
      setShowShareModal(true);

      // Also save to URL when sharing
      if (hasUnsavedChanges) {
        updateUrlWithList(list, router);
        setHasUnsavedChanges(false);
      }
    } catch {
      alert(
        "Error generating shareable URL. Your flashcard set might be too large."
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("URL copied to clipboard!");
  };

  const handleAddToMyLists = () => {
    if (!list.title.trim()) {
      alert("Please enter a title for your flashcard set!");
      return;
    }

    if (list.cards.length === 0) {
      alert("Please add at least one flashcard!");
      return;
    }

    const hasEmptyCards = list.cards.some(
      (card) => !card.front.trim() || !card.back.trim()
    );
    if (hasEmptyCards) {
      alert("Please fill in all flashcard fields before saving!");
      return;
    }

    try {
      const viewUrl = generateShareableUrl(list, "view");
      const editUrl = generateShareableUrl(list, "create");

      saveFlashcardList(list, viewUrl, editUrl);
      alert("Flashcard set saved to My Lists!");
    } catch {
      alert("Error saving to My Lists. Your flashcard set might be too large.");
    }
  };

  const handleViewImmediately = () => {
    if (!list.title.trim()) {
      alert("Please enter a title for your flashcard set!");
      return;
    }

    if (list.cards.length === 0) {
      alert("Please add at least one flashcard!");
      return;
    }

    const hasEmptyCards = list.cards.some(
      (card) => !card.front.trim() || !card.back.trim()
    );
    if (hasEmptyCards) {
      alert("Please fill in all flashcard fields before viewing!");
      return;
    }

    try {
      const viewUrl = generateShareableUrl(list, "view");
      window.open(viewUrl, "_blank");
    } catch {
      alert(
        "Error generating view URL. Your flashcard set might be too large."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create Flashcards
              </h1>
              {hasUnsavedChanges && (
                <p className="text-sm text-orange-600 mt-1">
                  You have unsaved changes
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  hasUnsavedChanges
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!hasUnsavedChanges}
              >
                Save
              </button>
              <button
                onClick={handleAddToMyLists}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Add to My Lists
              </button>
              <button
                onClick={handleViewImmediately}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                View Immediately
              </button>
              <button
                onClick={handleShare}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Share
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Home
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flashcard Set Title
            </label>
            <input
              type="text"
              value={list.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title for your flashcard set"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Flashcards ({list.cards.length})
              </h2>
              <button
                onClick={handleAddCard}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Card
              </button>
            </div>

            <div className="space-y-4">
              {list.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Card {index + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
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
                        onChange={(e) =>
                          handleUpdateCard(card.id, "front", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleUpdateCard(card.id, "back", e.target.value)
                        }
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
              ))}

              {list.cards.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No flashcards yet. Click &quot;Add Card&quot; to get
                    started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Share Your Flashcards
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Share this URL to let others study your flashcards:
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
