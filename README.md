# 📚 Flashcards App

A URL-based flashcard application built with Next.js and TypeScript. All flashcard data is stored in the URL (similar to Excalidraw), making it easy to share and access without requiring a database.

## ✨ Features

- **URL-based Storage**: All flashcard data is encoded in the URL using base64 compression
- **No Database Required**: Share flashcards by simply sharing the URL
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Study Mode**: Interactive flashcard studying with progress tracking
- **Create & Edit**: Easy-to-use interface for creating and editing flashcard sets
- **Hash Routing**: Clean URLs with hash-based routing for better sharing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd flashcards
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Creating Flashcards

1. Go to the home page and click "Create New Set"
2. Add a title for your flashcard set
3. Add cards with front (question) and back (answer) content
4. Save your flashcard set

### Studying Flashcards

1. Click "Share" on your created set to get a study URL
2. Open the study URL to start studying
3. Use the flip button to reveal answers
4. Track your progress with correct/incorrect buttons

### Sharing Flashcards

- Share the study URL with others
- No account required - anyone with the URL can study the flashcards
- URLs are portable and work across devices

## 🏗️ Architecture

- **Next.js Pages Router**: File-based routing system
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Hash-based URLs**: Data stored in URL hash for better sharing
- **Compression**: Uses fflate for efficient data compression

## 📁 Project Structure

```
src/
├── pages/
│   ├── index.tsx          # Home page
│   ├── create.tsx         # Create/edit flashcards
│   └── view.tsx           # Study flashcards
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   ├── urlData.ts         # URL encoding/decoding utilities
│   └── flashcards.ts      # Flashcard manipulation utilities
└── styles/
    └── globals.css        # Global styles
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 Data Format

Flashcard data is stored in the URL hash as compressed base64. The format includes:

- Flashcard set title
- Array of cards with front/back content
- Unique IDs for each card and set
