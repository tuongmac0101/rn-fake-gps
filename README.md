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
# rn-fake-gps
