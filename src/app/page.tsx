export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center font-syne">StellarDID Resolver</h1>
        <div className="flex flex-col items-center">
          <input 
            type="text" 
            placeholder="Search DID (e.g. did:stellar:G...)" 
            className="w-full max-w-lg p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>
    </main>
  );
}
