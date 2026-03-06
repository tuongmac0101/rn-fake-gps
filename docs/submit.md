# Submit app

## IOS

- Reference: https://docs.expo.dev/guides/submit-to-app-store/

### Preview

```bash
 bun build:ios:preview
 bun submit:ios:preview
```

OR

```bash
 bun build:ios:preview --auto-submit
```

#### OTA Preview:

```bash
bun ota:preview
```

### Production

```bash
 bun build:ios:prod
 bun submit:ios:prod
```

OR

```bash
 bun build:ios:prod --auto-submit
```

#### OTA Production:

```bash
bun ota:prod
```
