// Author: RawNuke
// Copyright (c) 2026 RawNuke. All rights reserved.

"use client";

import { useEffect, useState } from "react";
import type { Network } from "@/lib/types";

const NETWORK_KEY = "stellardid_network";

export function useNetwork() {
  const [network, setNetworkState] = useState<Network>("testnet");

  useEffect(() => {
    const stored = localStorage.getItem(NETWORK_KEY);
    if (stored === "testnet" || stored === "mainnet") {
      setNetworkState(stored);
    }
  }, []);

  const setNetwork = (next: Network) => {
    setNetworkState(next);
    localStorage.setItem(NETWORK_KEY, next);
  };

  return { network, setNetwork };
}
