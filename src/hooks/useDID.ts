export function useDID() {
  return {
    did: null,
    document: null,
    loading: false,
    error: null,
    register: async () => {},
    resolve: async () => {}
  };
}
