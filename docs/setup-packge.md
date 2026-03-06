## Create project

```bash
npx create-expo-app@latest --template
```

select template blank typescript

## Setup EAS

```bash
eas login
```

```bash
eas build:configure
```

```bash
npx expo install expo-dev-client
```

## Setup tsconfig.json and alias path

```bash
npx expo install tsx --dev
```

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "~/*": ["src/*"],
      "~/assets": ["assets"]
    },
    "skipLibCheck": true
  }
}
```

## EAS update

```bash
eas update --channel [channel-name] --message "[message]"
```

## Navigation

```bash
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack @react-navigation/bottom-tabs
```

## React query

```bash
npx expo install @tanstack/react-query @dev-plugins/react-query
```

```tsx
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

// Wrap app with TanstackQuery
<TanstackQuery>
  <App />
</TanstackQuery>;
```

## Setup form (use formik + yup)

```bash
npx expo install formik yup
```

## Setup flash list

[Flash List Documentation](https://shopify.github.io/flash-list/docs/)

```bash
npx expo install @shopify/flash-list
```
