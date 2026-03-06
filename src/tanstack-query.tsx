import type { PropsWithChildren, ReactNode } from "react";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Whether to refetch data when window is focused
      refetchOnReconnect: false, // Whether to refetch data when network connection is restored
      retry: 0, // Number of retry attempts
    },
    mutations: {
      retry: 0, // Number of retry attempts
    },
  },
});

export const TanstackQuery = ({ children }: PropsWithChildren) => {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
