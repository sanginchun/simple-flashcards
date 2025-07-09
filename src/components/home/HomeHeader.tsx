export default function HomeHeader() {
  return (
    <div className="text-center mb-12">
      <div className="relative">
        <h1 className="text-5xl md:text-6xl text-slate-800 dark:text-slate-200 font-bold mb-6 font-display leading-tight">
          Simple Flashcards
        </h1>
      </div>
      <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        <span className="block mt-2 text-lg text-slate-500 dark:text-slate-400">
          No Sign-up • Shareable Links • Free Forever
        </span>
      </p>
    </div>
  );
}
