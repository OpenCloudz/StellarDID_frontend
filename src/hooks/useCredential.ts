export function useCredential(subject?: string) {
  return {
    credentials: [],
    loading: false,
    issue: async () => {},
    verify: async () => {}
  };
}
