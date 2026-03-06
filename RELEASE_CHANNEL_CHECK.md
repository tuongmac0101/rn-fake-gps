# Kiểm tra Release Channel "release" cho Apple App Store

**Ngày kiểm tra:** 28/01/2026  
**Channel:** `release`  
**Environment:** `APP_ENV=release`

---

## ✅ Những gì ĐÚNG

### 1. Icon Configuration

- ✅ **File:** `assets/logo.png` tồn tại
- ✅ **Kích thước:** 1024x1024 pixels (đúng yêu cầu App Store)
- ✅ **Format:** PNG
- ✅ **Config:** Đã được cấu hình đúng trong `src/@config/index.ts`

### 2. Permissions (Info.plist)

- ✅ **NSCameraUsageDescription:** Đã có với mô tả tiếng Việt
- ✅ **NSPhotoLibraryUsageDescription:** Đã có với mô tả tiếng Việt
- ✅ **NSPhotoLibraryAddUsageDescription:** Đã có với mô tả tiếng Việt
- ✅ **ITSAppUsesNonExemptEncryption:** `false` (đúng cho app không dùng encryption ngoài standard)

### 3. EAS Build Configuration

- ✅ **Channel:** `release` (đúng)
- ✅ **Environment:** `production` (đúng)
- ✅ **Auto Increment:** `true` (tự động tăng build number)
- ✅ **Distribution:** Mặc định là `store` (đúng cho App Store)

### 4. iOS Configuration

- ✅ **Bundle Identifier:** `com.apetechs` (cho release env)
- ✅ **App Name:** `APETechs`
- ✅ **Supports Tablet:** `true`
- ✅ **Orientation:** `portrait`
- ✅ **New Architecture:** Enabled

---

## ⚠️ VẤN ĐỀ CẦN SỬA

### 🔴 CRITICAL: Icon có Transparency

**Vấn đề:**

- Icon `assets/logo.png` có alpha channel (transparency)
- Apple App Store **KHÔNG CHẤP NHẬN** icon có transparency
- App sẽ bị **REJECT** nếu submit với icon có transparency

**Cách sửa:**

```bash
# Option 1: Sử dụng script tự động
./fix-icon-transparency.sh

# Option 2: Sử dụng ImageMagick (nếu đã cài)
convert assets/logo.png -background white -alpha remove -alpha off assets/logo.png

# Option 3: Manual
# - Mở file trong Preview (macOS) hoặc Photoshop
# - Export với background màu trắng (hoặc màu phù hợp)
# - Đảm bảo không có transparency
```

**Verify sau khi sửa:**

```bash
sips -g hasAlpha assets/logo.png
# Phải trả về: hasAlpha: no
```

---

### ⚠️ WARNING: Bundle Identifier khác nhau

**Vấn đề:**

- **Production env:** `com.apetechs`
- **Release env:** `com.apetechs` (thiếu "go")

**Cần kiểm tra:**

1. Bundle ID `com.apetechs` đã được đăng ký trên App Store Connect chưa?
2. Nếu chưa, cần tạo App ID mới trên Apple Developer Portal
3. Nếu đã có app khác dùng bundle ID này, sẽ bị conflict

**Hành động:**

- ✅ Nếu đã đăng ký và đúng → OK, không cần sửa
- ❌ Nếu chưa đăng ký → Cần tạo App ID trước khi build
- ❌ Nếu muốn dùng cùng bundle ID với production → Sửa code

**Nếu muốn dùng cùng bundle ID với production:**

```typescript
// src/@config/index.ts - line 36
case EAppEnv.release:
  return {
    name: APP_NAME,
    packageId: BASE_PACKAGE_ID, // Thay vì 'com.apetechs'
    scheme: APP_SCHEME,
  };
```

---

## 📋 Checklist Trước Khi Submit

### Code/Config (Đã kiểm tra)

- [x] Icon file tồn tại và đúng kích thước
- [ ] **Icon không có transparency** ⚠️ CẦN SỬA
- [x] Permissions đã khai báo đầy đủ
- [x] Bundle Identifier đã cấu hình
- [x] EAS config đúng channel "release"
- [ ] **Bundle ID đã đăng ký trên App Store Connect** ⚠️ CẦN XÁC NHẬN

### App Store Connect (Cần kiểm tra thủ công)

- [ ] App Privacy questionnaire đã hoàn thành
- [ ] App Review Information (demo account, notes)
- [ ] Screenshots đã upload (bắt buộc)
- [ ] App description, keywords, support URL
- [ ] Age rating đã cấu hình

### Testing

- [ ] Test trên TestFlight Internal trước
- [ ] App không crash khi launch
- [ ] Tất cả features hoạt động bình thường
- [ ] Permissions hoạt động đúng (camera, photo library)

---

## 🚀 Các Bước Tiếp Theo

1. **Sửa icon transparency:**

   ```bash
   ./fix-icon-transparency.sh
   # Hoặc sửa manual
   ```

2. **Xác nhận Bundle ID:**
   - Kiểm tra App Store Connect xem `com.apetechs` đã tồn tại chưa
   - Nếu chưa, tạo App ID mới hoặc sửa code để dùng bundle ID đã có

3. **Build và test:**

   ```bash
   bun run build:ios:release
   ```

4. **Submit:**
   ```bash
   bun run submit:ios:release
   ```

---

## 📝 Ghi chú

- Icon transparency là vấn đề **CRITICAL** - sẽ bị reject 100%
- Bundle ID phải khớp với App Store Connect, nếu không build sẽ fail
- Tất cả permissions đã được cấu hình đúng
- Cấu hình EAS đã đúng cho channel "release"

---

**Tóm tắt:** Code config đã đúng, nhưng cần sửa **icon transparency** và xác nhận **bundle identifier** trước khi submit.
