import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  decodeListFromUrl,
  updateUrlWithList,
  generateShareableUrl,
} from "@/utils/urlData";
import { useFlashcardStore } from "../stores/flashcardStore";
import { useSavedListsStore } from "../stores/savedListsStore";
import CreatePageHeader from "@/components/create/CreatePageHeader";
import FlashcardSetTitle from "@/components/create/FlashcardSetTitle";
import FlashcardEditor from "@/components/create/FlashcardEditor";
import ShareModal from "@/components/create/ShareModal";

export default function CreatePage() {
  const router = useRouter();
  const {
    list,
    hasUnsavedChanges,
    shareUrl,
    showShareModal,
    setList,
    resetToEmpty,
    updateTitle,
    addCard,
    updateCard,
    deleteCard,
    markSaved,
    generateShareUrl,
    setShowShareModal,
    isValidForSaving,
  } = useFlashcardStore();

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
          // If decoding fails, start with an empty list
          console.warn("Failed to decode URL data, starting with empty list");
          resetToEmpty();
        }
      } catch (error) {
        console.error("Error decoding URL data:", error);
        // Start with empty list if URL data is corrupted
        resetToEmpty();
      }
    }
  }, [router, router.asPath, setList, resetToEmpty]); // Listen to asPath changes to catch hash changes

  const handleTitleChange = (title: string) => {
    updateTitle(title);
  };

  const handleAddCard = () => {
    addCard();
  };

  const handleUpdateCard = (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => {
    const success = updateCard(cardId, field, value);
    if (!success) {
      alert("Text too long! Please keep it under 200 characters.");
    }
  };

  const handleDeleteCard = (cardId: string) => {
    deleteCard(cardId);
  };

  const handleSave = () => {
    const validation = isValidForSaving();
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      updateUrlWithList(list, router);
      markSaved();
      
      // Auto-update My Lists if this list is already saved
      if (isListSaved(list.id)) {
        saveFlashcardList(list);
      }
      
      alert("Flashcard set saved successfully!");
    } catch {
      alert("Error saving flashcard set. It might be too large.");
    }
  };

  const handleShare = () => {
    const validation = isValidForSaving();
    if (!validation.isValid) {
      alert(validation.error?.replace("saving", "sharing"));
      return;
    }

    try {
      generateShareUrl();
      setShowShareModal(true);

      // Also save to URL when sharing
      if (hasUnsavedChanges) {
        updateUrlWithList(list, router);
        markSaved();
        
        // Auto-update My Lists if this list is already saved
        if (isListSaved(list.id)) {
          saveFlashcardList(list);
        }
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
    const validation = isValidForSaving();
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      saveFlashcardList(list);
      alert("Flashcard set saved to My Lists!");
    } catch {
      alert("Error saving to My Lists. Your flashcard set might be too large.");
    }
  };

  const handleViewImmediately = () => {
    const validation = isValidForSaving();
    if (!validation.isValid) {
      alert(validation.error?.replace("saving", "viewing"));
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
          <CreatePageHeader
            hasUnsavedChanges={hasUnsavedChanges}
            isListSaved={isListSaved(list.id)}
            onSave={handleSave}
            onAddToMyLists={handleAddToMyLists}
            onViewImmediately={handleViewImmediately}
            onShare={handleShare}
          />

          <FlashcardSetTitle
            title={list.title}
            onTitleChange={handleTitleChange}
          />

          <FlashcardEditor
            list={list}
            onAddCard={handleAddCard}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
          />
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        shareUrl={shareUrl}
        onClose={() => setShowShareModal(false)}
        onCopy={copyToClipboard}
      />
    </div>
  );
}
