# StellarDID — Frontend

> The web interface for StellarDID — register DIDs, issue credentials, and verify identity on Stellar.

This package contains the Next.js frontend. It is the interaction surface for three distinct user roles: holders managing their own identity, issuers publishing credentials, and verifiers checking a DID's status.

---

## Overview

The frontend is a role-based web app with three main views:

- **Holder Dashboard** — connect Freighter, register a DID, view credentials you hold, and generate a Verifiable Presentation to share with verifiers
- **Issuer Panel** — select a subject address, choose a credential type, and publish a signed credential on-chain
- **Verifier / Public View** — look up any `did:stellar:G...`, see its DID Document, and check current credential status

---

## Pages

```
/                   Public DID lookup — resolve any did:stellar: identifier
/dashboard          Holder — view and manage your DID and credentials
/issue              Issuer — publish a verifiable credential
/verify             Verifier — check a subject's credential status
```

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, global providers
│   │   ├── page.tsx                # Public DID resolver
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Holder dashboard
│   │   ├── issue/
│   │   │   └── page.tsx            # Issuer panel
│   │   └── verify/
│   │       └── page.tsx            # Verifier view
│   ├── components/
│   │   ├── Header.tsx              # Nav, wallet connect, network toggle
│   │   ├── DIDCard.tsx             # DID Document display
│   │   ├── CredentialCard.tsx      # Single credential with status badge
│   │   ├── IssuerForm.tsx          # Credential issuance form
│   │   └── VerifierPanel.tsx       # Credential status check UI
│   ├── hooks/
│   │   ├── useWallet.ts            # Freighter connection and signing
│   │   ├── useDID.ts               # DID registration and resolution
│   │   └── useCredential.ts        # Credential issuance and verification
│   └── lib/
│       ├── stellar.ts              # Soroban contract calls
│       ├── did.ts                  # DID Document construction helpers
│       └── types.ts                # Shared TypeScript types
├── public/
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Prerequisites

- Node.js 18+
- [Freighter](https://www.freighter.app) browser extension installed
- A funded Stellar testnet account
- A running StellarDID backend (see [backend/README.md](../backend/README.md)) or the shared testnet deployment URL

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/stellardid_frontend.git
cd stellardid_frontend

# Install dependencies
npm install

# Copy env file and fill in values
cp .env.local.example .env.local
```

### Environment Variables

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:4000        # local backend
# NEXT_PUBLIC_API_URL=https://api.stellardid.xyz # shared testnet deployment

# Stellar
NEXT_PUBLIC_NETWORK=testnet                      # testnet | mainnet
NEXT_PUBLIC_REGISTRY_CONTRACT_ID=CXXX...        # deployed contract ID
```

```bash
# Start dev server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Hooks

### `useWallet`

Manages Freighter wallet connection and signing state.

```ts
const { isConnected, publicKey, connect, disconnect, signTransaction } = useWallet();
```

### `useDID`

Handles DID registration and resolution against the backend API.

```ts
const { did, document, loading, error, register, resolve } = useDID();
```

### `useCredential`

Handles credential issuance, retrieval, and status checking.

```ts
const { credentials, loading, issue, verify } = useCredential(subject);
```

---

## Contributing

Contributions to the frontend are welcome. Here's how to get started.

### Finding Work

Browse [open issues](../../issues) and filter by the `frontend` label. Issues labelled `good first issue` are a great starting point — comment before picking one up to avoid duplicate work.

### Making Changes

Create a branch off `main`:

```bash
git checkout -b feat/short-description
```

### Code Style

- TypeScript strict mode — no `any`
- Functional components only — no class components
- `"use client"` only when hooks or browser APIs are needed — prefer server components
- All Stellar SDK usage stays inside `src/lib/stellar.ts` — components never import from `@stellar/stellar-sdk` directly
- Tailwind for all styling — no inline styles except CSS variables
- Keep hooks thin — data fetching and state only, no JSX

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```bash
git commit -m "feat(dashboard): add credential expiry countdown"
git commit -m "fix(header): wallet disconnect not clearing public key"
git commit -m "feat(issue): add credential type selector dropdown"
git commit -m "refactor(hooks): extract credential fetching into useCredential"
```

### Pull Requests

Include in your PR description:
- What the change does
- Which issue it resolves
- A screenshot or screen recording if the change is visual

### Good Places to Start

| Issue | What it involves |
|---|---|
| Add loading skeleton to CredentialCard | Tailwind skeleton animation while credentials load |
| Persist last-used network in localStorage | Read/write `localStorage` in `useWallet` |
| Add copy-to-clipboard for DID string | Small utility component with clipboard API |
| Build out `VerifierPanel` component | Takes a DID, calls `/api/verify`, shows result |
| Add 404 state for unregistered DID | Handle null response from `useDID.resolve()` |
| Implement Verifiable Presentation flow | Multi-credential selection + Freighter signing |

---

## Deployment

The frontend deploys to Vercel. Push to `main` and Vercel picks it up automatically. Preview deployments are created for every pull request.

Set the environment variables listed above in the Vercel project settings before deploying.

---

## License

Apache 2.0
