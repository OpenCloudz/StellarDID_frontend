export function useWallet() {
  return {
    isConnected: false,
    publicKey: null,
    connect: async () => {},
    disconnect: () => {},
    signTransaction: async () => {}
  };
}
