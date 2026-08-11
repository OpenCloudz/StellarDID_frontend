"use client";

import { useState, useCallback } from "react";
import type { DIDDocument } from "@/lib/types";

interface UseDIDReturn {
  did: string | null;
  document: DIDDocument | null;
  loading: boolean;
  /** null = no attempt yet; string = error message */
  error: string | null;
  /** true after a successful resolve returned nothing (DID not registered) */
  notFound: boolean;
  register: () => Promise<void>;
  resolve: (did: string) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function useDID(): UseDIDReturn {
  const [did, setDid] = useState<string | null>(null);
  const [document, setDocument] = useState<DIDDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const resolve = useCallback(async (identifier: string) => {
    if (!identifier.trim()) return;

    setLoading(true);
    setError(null);
    setNotFound(false);
    setDocument(null);
    setDid(identifier.trim());

    try {
      const res = await fetch(
        `${API_URL}/api/did/${encodeURIComponent(identifier.trim())}`
      );

      if (res.status === 404) {
        setNotFound(true);
        return;
      }

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data: DIDDocument = await res.json();
      setDocument(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async () => {
    // Stub — will be implemented in #4
  }, []);

  return { did, document, loading, error, notFound, register, resolve };
}
