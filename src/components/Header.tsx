"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-800">
      <Link href="/">
        <div className="font-syne font-bold text-xl">StellarDID</div>
      </Link>
      <div className="flex gap-4">
        {/* Network toggle and wallet connect will go here */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-mono text-sm">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
