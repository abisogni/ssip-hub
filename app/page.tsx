export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Space Systems Innovation Platform
        </p>
        <h1 className="text-4xl font-bold tracking-tight">SSIP Hub</h1>
        <p className="text-gray-400 text-lg">
          Partner matchmaking platform. Coming soon.
        </p>
        <a
          href="https://www.ssip-pl.ch"
          className="inline-block text-sm text-gray-500 hover:text-white transition-colors"
        >
          ssip-pl.ch
        </a>
      </div>
    </main>
  );
}
