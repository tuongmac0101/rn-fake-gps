## APETechs Mobile App

Ứng dụng mobile nội bộ cho APETechs, được xây dựng bằng **React Native + Expo** và sử dụng **EAS Build / EAS Update** để phát hành và OTA.

---

### Yêu cầu môi trường

- **Node.js** (phiên bản tương thích với Expo SDK 53)
- **Bun** (project sử dụng `bun run`)
- **EAS CLI**: `npm install -g eas-cli`
- Đã login Expo: `eas login`

---

### Cài đặt

- Clone repo và vào thư mục project:

```bash
git clone <repo-url>
cd apetechs-app
```

- Cài dependencies:

```bash
bun install
```

- (Tuỳ chọn) Cấu hình biến môi trường:
  - Copy `.env.example` → `.env`
  - Hoặc dùng EAS env (xem `docs/eas-env.md`) để `env:pull` theo môi trường:

```bash
eas env:pull --environment development --non-interactive
eas env:pull --environment preview --non-interactive
eas env:pull --environment production --non-interactive
```

---

### Chạy development

- Chạy Metro:

```bash
bun run start
```

- Chạy với Dev Client:

```bash
bun run start:dev-client
```

- Chạy app trên thiết bị:

```bash
bun run android
bun run ios
```

- Build native cho thiết bị:

```bash
bun run build:device:android
bun run build:device:ios
```

Tham khảo thêm:

- `docs/RUN_ON_DEVICE.md`
- `docs/setup-install.md`

---

### Environments & EAS build profiles

Các profile được định nghĩa trong `eas.json`:

| Profile      | APP_ENV     | Mục đích                       |
| ------------ | ----------- | ------------------------------ |
| local        | development | Build local / simulator        |
| local-device | development | Dev client trên device         |
| development  | development | Internal dev build             |
| preview      | preview     | Staging / TestFlight preview   |
| production   | production  | Store với bundle ID production |
| release      | release     | Store (kênh release riêng)     |
| apk-release  | release     | Android APK nội bộ             |

Các script build chính (xem thêm trong `package.json`):

```bash
# Dev / preview / production
bun run build:dev
bun run build:preview
bun run build:prod

# Release channel
bun run build:release

# Chỉ định platform
bun run build:ios:dev
bun run build:android:dev
bun run build:ios:preview
bun run build:android:preview
bun run build:ios:prod
bun run build:android:prod
bun run build:ios:release
bun run build:android:release

# Android APK cho kênh apk-release
bun run build:android:apk-release
```

---

### OTA (Expo Updates)

App sử dụng **expo-updates** và EAS Update. Trước khi OTA luôn chạy validation:

```bash
bun run pre-ota
```

Các lệnh OTA (đã tự động chạy pre-ota):

```bash
# Development
bun run ota:dev

# Preview / Staging
bun run ota:preview

# Production
bun run ota:prod

# Release channel riêng
bun run ota:release

# Android apk-release branch
bun run ota:apk-release
```

Chi tiết quy trình: xem `OTA_GUIDE.md`.

---

### Submit lên Store

Các script submit thông qua EAS Submit:

```bash
# Preview
bun run submit:ios:preview
bun run submit:android:preview

# Production
bun run submit:ios:prod
bun run submit:android:prod

# Release channel
bun run submit:ios:release
bun run submit:android:release
```

Trước khi submit iOS cần:

- Hoàn thành App Privacy trên App Store Connect
- Điền App Review Information (demo account, hướng dẫn)
- Chuẩn bị screenshot, description, keywords, support URL

Tham chiếu:

- `docs/ios-submission-checklist.md`
- `RELEASE_CHANNEL_CHECK.md`

---

### Scripts hữu ích

- **Fix icon transparency (App Store):**

  App icon 1024×1024 dùng cho App Store **không được có transparency**. Để fix:

  ```bash
  ./fix-icon-transparency.sh
  sips -g hasAlpha assets/logo.png
  # Kết quả mong muốn: hasAlpha: no
  ```

  Xem chi tiết thêm trong `RELEASE_CHANNEL_CHECK.md`.

- **OTA shell scripts:**
  - `ota-dev.sh`
  - `ota-release.sh`
  - `ota-apk-release.sh`
  - `ota-full.sh`

  Các script này wrap lại lệnh `bun run ota:*` tương ứng để deploy nhanh theo từng kênh.

---

### Cấu trúc thư mục (rút gọn)

- `src/` – source code chính (navigation, screens, stores, API,…)
- `assets/` – icon, splash, images
- `docs/` – tài liệu nội bộ: tech stack, setup, EAS env, OTA, iOS checklist, theme, v.v.

---

### Tài liệu tham khảo

- `docs/tech-stack.md` – mô tả tech stack chi tiết
- `docs/setup-install.md` – hướng dẫn cài đặt trên thiết bị
- `docs/eas-env.md` – hướng dẫn quản lý environment variables với EAS
- `docs/submit.md` – ghi chú submit build
- `docs/ios-submission-checklist.md` – checklist gửi iOS
- `OTA_GUIDE.md` – hướng dẫn đầy đủ về OTA
- `RELEASE_CHANNEL_CHECK.md` – ghi chú kiểm tra kênh release
