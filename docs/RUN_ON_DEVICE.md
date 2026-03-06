# Hướng dẫn chạy app trên thiết bị thật (iOS)

## Yêu cầu
- Mac với Xcode đã cài đặt
- iPhone/iPad kết nối qua USB
- Apple Developer account

## Cách 1: Build qua script (Khuyến nghị - Đơn giản nhất)

### Bước 1: Cắm iPhone vào Mac qua USB

### Bước 2: Chạy script build
```bash
bun run build:device:ios
```

Hoặc:
```bash
npx expo run:ios --device
```

Script này sẽ:
- Tự động phát hiện iPhone đã cắm USB
- Build app bằng Xcode
- Cài app lên iPhone
- Mở app và kết nối Metro bundler

### Bước 3: Chạy Metro bundler (nếu chưa tự động chạy)
```bash
bun start:dev-client
```

**Lưu ý:** Nếu gặp lỗi signing hoặc build failed, hãy dùng Cách 2 (build qua Xcode) để xem lỗi chi tiết.

---

## Cách 2: Build qua Xcode (Khi gặp lỗi cần debug)

### Bước 1: Mở project trong Xcode
```bash
open ios/APETechsDEV.xcworkspace
```

### Bước 2: Chọn device
- Ở thanh toolbar trên cùng của Xcode
- Click vào dropdown bên cạnh nút Play (▶️)
- Chọn iPhone của bạn (không phải simulator)

### Bước 3: Build và run
- Nhấn nút ▶️ (Play) hoặc `Cmd + R`
- Xcode sẽ build và tự động cài app lên iPhone
- Lần đầu có thể mất 5-10 phút

### Bước 4: Chạy Metro bundler
```bash
bun start:dev-client
```

Hoặc:
```bash
npx expo start --dev-client --clear
```

### Bước 5: Kết nối
- App sẽ tự động kết nối với Metro bundler
- Từ giờ code sẽ hot reload tự động

---

## Cách 3: Build qua command line với device ID cụ thể

### Bước 1: Kiểm tra device đã kết nối
```bash
xcrun xctrace list devices
```

Tìm device ID của iPhone (dạng: `00008120-000A2DA40CC2601E`)

### Bước 2: Build và cài app
```bash
LANG=en_US.UTF-8 npx expo run:ios --device <DEVICE_ID>
```

Ví dụ:
```bash
LANG=en_US.UTF-8 npx expo run:ios --device 00008120-000A2DA40CC2601E
```

### Bước 3: Chạy Metro bundler
```bash
bun start:dev-client
```

---

## Troubleshooting

### Lỗi: "No apps connected"
**Nguyên nhân:** App không có development client hoặc không tìm thấy Metro bundler

**Giải pháp:**
1. Đảm bảo profile build có `"developmentClient": true` trong `eas.json`
2. Lắc điện thoại để mở Developer Menu
3. Chọn "Settings" → "Debug server host & port"
4. Nhập IP máy Mac: `<IP_ADDRESS>:8081`
5. Reload app

Kiểm tra IP máy Mac:
```bash
ipconfig getifaddr en0
```

### Lỗi CocoaPods encoding
**Giải pháp:**
```bash
export LANG=en_US.UTF-8
cd ios
pod install
```

### App không hot reload
**Kiểm tra:**
1. Metro bundler có đang chạy không?
2. Điện thoại và Mac cùng WiFi?
3. Firewall có block port 8081 không?

**Giải pháp:**
- Lắc điện thoại → Developer Menu → Reload
- Hoặc trong terminal Metro bundler, nhấn `r` để reload

### Build lỗi "Signing"
**Giải pháp:**
1. Mở Xcode
2. Chọn project → Signing & Capabilities
3. Chọn Team của bạn
4. Build lại

---

## Scripts hữu ích

### Chạy Metro bundler cho development build
```bash
bun start:dev-client
```

### Kill process đang chạy trên port 8081
```bash
lsof -ti:8081 | xargs kill -9
```

### Xem danh sách devices
```bash
xcrun xctrace list devices
```

### Prebuild (tạo native folders)
```bash
npx expo prebuild --clean
```

---

## Workflow hàng ngày

1. **Lần đầu tiên:**
   - Build app qua Xcode hoặc `expo run:ios --device`
   - App được cài lên iPhone

2. **Từ lần thứ 2 trở đi:**
   - Chỉ cần chạy: `bun start:dev-client`
   - Mở app trên iPhone
   - Code và app sẽ hot reload tự động

3. **Khi thêm native dependencies mới:**
   - Cần build lại qua Xcode hoặc `expo run:ios --device`

---

## Lưu ý quan trọng

✅ **Development Build vs Expo Go:**
- Development Build: App custom có `expo-dev-client`, kết nối với Metro bundler
- Expo Go: App có sẵn từ App Store, không cần build

✅ **Profile build:**
- Profile `local` trong `eas.json` có `"developmentClient": true`
- Đây là profile dùng để development

✅ **Hot reload:**
- Chỉ hoạt động khi Metro bundler đang chạy
- App phải được build với `developmentClient: true`

✅ **Network:**
- Điện thoại và Mac phải cùng WiFi
- Hoặc kết nối qua USB và dùng `adb reverse` (Android)
