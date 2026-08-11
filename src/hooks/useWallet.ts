"use client";

import { useState, useEffect } from "react";

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletAvailable, setWalletAvailable] = useState(false);

  useEffect(() => {
    // Freighter injects window.freighter when the extension is installed.
    setWalletAvailable(
      typeof window !== "undefined" && "freighter" in window
    );
  }, []);

  const connect = async () => {
    // Real implementation will call Freighter's requestAccess() and getPublicKey().
    // Left as a stub until the Freighter SDK is wired up.
    setIsConnected(true);
    setPublicKey("GBXXXXXXXXX");
  };

  const disconnect = () => {
    setIsConnected(false);
    setPublicKey(null);
  };

  const signTransaction = async (_xdr: string): Promise<string> => {
    return "";
  };

  return { isConnected, publicKey, walletAvailable, connect, disconnect, signTransaction };
}
