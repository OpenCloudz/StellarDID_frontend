Issue #11 — Set up environment variable config
Labels: setup, frontend
Description:
Add a typed config module for all NEXT_PUBLIC_ environment variables so components never read process.env directly.
Acceptance Criteria:

 .env.local.example documents NEXT_PUBLIC_API_URL, NEXT_PUBLIC_NETWORK, and NEXT_PUBLIC_REGISTRY_CONTRACT_ID
 src/lib/config.ts exports a typed config object validated on module load
 App throws a clear error at startup if a required variable is missing
 Config is imported and used in at least one service file (stellar.ts)


Issue #12 — Implement useWallet hook with Freighter integration
Labels: setup, frontend
Description:
Create src/hooks/useWallet.ts to manage Freighter wallet connection state across the app.
Acceptance Criteria:

 Hook returns { isConnected, publicKey, network, connect, disconnect, signTransaction, walletAvailable }
 walletAvailable is false when Freighter extension is not installed
 connect() calls freighter.getPublicKey() and updates state
 disconnect() clears state without requiring a Freighter API call
 Hook checks for an existing connection on mount and restores state if already authorised
 Network is inferred from Freighter's reported network passphrase


Issue #13 — Build Header component with wallet connect and network toggle
Labels: setup, frontend
Description:
Create the global Header component used across all pages, including the StellarDID logo, network selector, and wallet connect button.
Acceptance Criteria:

 Logo and project name rendered on the left
 Network toggle switches between testnet and mainnet and persists to localStorage
 Wallet connect button triggers useWallet().connect()
 When connected, shows shortened public key (G...XXXX) and a disconnect option
 When Freighter is not installed, button is disabled with a tooltip linking to freighter.app
 Header is rendered in app/layout.tsx and appears on all pages


Issue #14 — Scaffold page routes and empty page components
Labels: setup, frontend
Description:
Create the four page routes with empty but correctly structured components so contributors can work on each page independently.
Acceptance Criteria:

 app/page.tsx — public DID resolver (empty state + search input placeholder)
 app/dashboard/page.tsx — holder dashboard (wallet connect gate + empty credential list)
 app/issue/page.tsx — issuer panel (wallet connect gate + empty form)
 app/verify/page.tsx — verifier view (DID input + empty result area)
 Each page has correct metadata export with title and description
 Navigating to each route renders without errors