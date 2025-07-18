# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A URL-based flashcard application built with Next.js (pages router) and TypeScript. No database required - all data is stored in the URL like Excalidraw.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Core Components

- **Pages Router**: Using Next.js pages router for routing
- **URL Data Persistence**: All flashcard data encoded in URL parameters (like Excalidraw)
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: For styling

### Key Files

- `src/types/index.ts` - Type definitions for Flashcard, FlashcardList, and StudySession
- `src/utils/urlData.ts` - URL encoding/decoding utilities for data persistence
- `src/utils/flashcards.ts` - Flashcard manipulation utilities
- `src/pages/index.tsx` - Home page with navigation
- `src/pages/create.tsx` - Create/edit flashcard sets
- `src/pages/view.tsx` - Study flashcards interface

### Data Flow

1. Flashcard data is encoded in URL using base64 + URI encoding
2. URL parameters are decoded to reconstruct FlashcardList objects
3. All changes immediately update the URL for persistence
4. Shareable URLs allow easy distribution of flashcard sets

### URL Structure

- `/create?data=<encoded_data>` - Create/edit mode
- `/view?data=<encoded_data>` - Study mode
- Data encoding handles JSON compression and URL safety

### Character Limits

- Max card text: 200 characters per side
- Max URL data: ~1500 characters total
- These limits ensure URL compatibility across browsers

## TODOs

### UI Improvements

- **Component Library**: Implement HeadlessUI or ShadCN for better UI components
- **Animation Effects**: Add smooth animations for:
  - Card flipping transitions
  - Next/Previous card transitions
  - Loading states and interactions
- **Mobile Responsive**: Improve responsive design for mobile landscape mode
  - Optimize layout for horizontal orientation
  - Adjust card sizing and spacing
  - Ensure buttons and navigation are easily accessible
- **Internationalization (i18n)**: Add multi-language support
  - Implement next-i18next or similar i18n solution
  - Extract all UI text strings to translation files
  - Support for RTL languages
  - Language switcher in UI
- **MCP Support**: Implement Model Context Protocol integration
  - Create MCP server endpoints for flashcard data access
  - Enable AI-powered flashcard generation from content
  - Allow external MCP clients to interact with flashcard data
  - Implement secure authentication for MCP connections
