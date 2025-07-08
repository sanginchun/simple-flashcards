import { FlashcardList } from "@/types";
import { deflateSync, inflateSync } from "fflate";

// Maximum URL length considerations (most browsers support 2000+ chars)
const MAX_URL_DATA_LENGTH = 3000; // Increased due to compression

const stringToUint8Array = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

const uint8ArrayToString = (arr: Uint8Array): string => {
  return new TextDecoder().decode(arr);
};

export const encodeListToUrl = (list: FlashcardList): string => {
  try {
    // Optimize data structure for compression
    const optimizedList = {
      i: list.id,
      t: list.title,
      c: list.cards.map((card) => ({
        i: card.id,
        f: card.front,
        b: card.back,
      })),
    };

    const jsonString = JSON.stringify(optimizedList);
    const jsonBytes = stringToUint8Array(jsonString);

    // Compress using fflate
    const compressed = deflateSync(jsonBytes, { level: 9 });

    // Convert to base64
    const base64 = btoa(String.fromCharCode(...compressed));

    if (base64.length > MAX_URL_DATA_LENGTH) {
      throw new Error("Flashcard list too large for URL encoding");
    }

    return base64;
  } catch (error) {
    console.error("Error encoding list to URL:", error);
    throw error;
  }
};

export const decodeListFromUrl = (
  encodedData: string
): FlashcardList | null => {
  try {
    // Validate base64 string before decoding
    if (!encodedData || typeof encodedData !== "string") {
      throw new Error("Invalid encoded data: empty or not a string");
    }

    // Clean the base64 string (remove any URL encoding artifacts)
    const cleanEncodedData = encodedData.trim();

    // Check if it's valid base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(cleanEncodedData)) {
      throw new Error("Invalid base64 string format");
    }

    // Decode from base64
    const compressed = new Uint8Array(
      atob(cleanEncodedData)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Decompress using fflate
    const decompressed = inflateSync(compressed);
    const jsonString = uint8ArrayToString(decompressed);

    // Parse optimized structure
    const optimizedList = JSON.parse(jsonString);

    // Convert back to full structure
    const list: FlashcardList = {
      id: optimizedList.i,
      title: optimizedList.t,
      cards: optimizedList.c.map((card: { i: string; f: string; b: string }) => ({
        id: card.i,
        front: card.f,
        back: card.b,
      })),
    };

    // Validate the structure
    if (!list.id || !Array.isArray(list.cards)) {
      throw new Error("Invalid flashcard list structure");
    }

    // Title can be empty during editing, but we need a default
    if (!list.title) {
      list.title = "";
    }

    return list;
  } catch (error) {
    console.error("Error decoding list from URL:", error);
    return null;
  }
};

export const updateUrlWithList = (list: FlashcardList, router: { push: (url: string, as?: string, options?: { shallow?: boolean }) => void }) => {
  try {
    const encodedData = encodeListToUrl(list);
    const url = `/create#${encodeURIComponent(encodedData)}`;
    router.push(url, undefined, { shallow: true });
  } catch (error) {
    console.error("Error updating URL with list:", error);
  }
};

export const generateShareableUrl = (list: FlashcardList, page: 'view' | 'create' = 'view'): string => {
  try {
    const encodedData = encodeListToUrl(list);
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/${page}#${encodeURIComponent(encodedData)}`;
  } catch (error) {
    console.error("Error generating shareable URL:", error);
    throw error;
  }
};
