# iOS Production Build - Submission Checklist

Build ID: `d680a7a8-dccc-4154-8b27-7570af9670af`  
Version: **1.0.0** (Build 3)  
Status: ✅ Build finished & submitted to App Store Connect

---

## ✅ Checklist Bắt Buộc

| Hạng mục | Bắt buộc? | Status | Ghi chú |
|----------|-----------|--------|---------|
| **App Icon 1024×1024** | ✔ | ✅ PASS | `assets/icon.png` - 1024x1024 PNG |
| **Bundle ID** | ✔ | ✅ PASS | `com.apetechs` (production) |
| **Version + Build Number** | ✔ | ✅ PASS | Version: 1.0.0, Build: 3 (auto-increment enabled) |
| **Privacy Manifest / InfoPlist** | ✔ | ⚠️ BASIC | `ITSAppUsesNonExemptEncryption: false` configured |
| **App Privacy (App Store Connect)** | ✔ | ⚠️ MANUAL | **CẦN KIỂM TRA** - Thường bị thiếu → block external testing |
| **App Review Info** | ✔ | ⚠️ MANUAL | **CẦN KIỂM TRA** - Account login, mô tả |
| **App Sign & Capabilities** | ✔ | ✅ PASS | EAS auto setup - Certificate & Provisioning Profile OK |
| **Functional App (không crash)** | ✔ | ⚠️ MANUAL | **CẦN TEST** - Điều kiện để duyệt external |

---

## 📋 Chi Tiết Cấu Hình

### 1. ✅ App Icon
- **File:** `assets/icon.png`
- **Size:** 1024x1024 pixels
- **Format:** PNG (8-bit colormap)
- **Transparency:** Cần verify không trong suốt
- **Location in config:** `app.config.ts` → `icon: "./assets/icon.png"`

### 2. ✅ Bundle Identifier
- **Production:** `com.apetechs`
- **Preview:** `com.apetechs.preview`
- **Development:** `com.apetechs.dev`
- **Note:** Không thay đổi sau khi tạo ✓

### 3. ✅ Version & Build Number
- **Version:** 1.0.0 (defined in `src/@config/index.ts`)
- **Build Number:** 3 (auto-incremented)
- **Auto Increment:** Enabled in `eas.json` → `production.autoIncrement: true`

### 4. ⚠️ Privacy Manifest / InfoPlist
**Current Configuration:**
```typescript
// src/@config/index.ts
ios: {
  supportsTablet: true,
  bundleIdentifier: packageId,
  infoPlist: {
    ITSAppUsesNonExemptEncryption: false,
  },
}
```

**⚠️ CẦN KIỂM TRA:**
- App có sử dụng Camera không? → Cần thêm `NSCameraUsageDescription`
- App có sử dụng Photo Library không? → Cần thêm `NSPhotoLibraryUsageDescription`
- App có sử dụng Location không? → Cần thêm `NSLocationWhenInUseUsageDescription`
- App có tracking user data không? → Cần thêm `NSUserTrackingUsageDescription`

**Không tìm thấy:**
- ❌ `expo-camera` package
- ❌ `expo-image-picker` package
→ Có thể không cần camera permissions

### 5. ⚠️ App Privacy (App Store Connect)
**CẦN HOÀN THÀNH TRÊN APP STORE CONNECT:**

Vào: https://appstoreconnect.apple.com
1. Chọn app "APETechs"
2. Vào tab **App Privacy**
3. Khai báo:
   - Data collection practices
   - Data usage
   - Data linked to user
   - Data tracking

**⚠️ QUAN TRỌNG:** Thiếu phần này sẽ block External Testing!

### 6. ⚠️ App Review Information
**CẦN HOÀN THÀNH TRÊN APP STORE CONNECT:**

Vào: https://appstoreconnect.apple.com
1. Chọn app "APETechs"
2. Vào **App Information** → **App Review Information**
3. Cung cấp:
   - ✅ Demo account (username/password) nếu app cần login
   - ✅ Notes for reviewer (hướng dẫn test app)
   - ✅ Contact information

**Demo Account Example:**
```
Username: demo@apetechs.com
Password: Demo123!
Notes: 
- App requires login to access features
- Use demo account provided above
- Main features: [list main features]
```

### 7. ✅ App Signing & Capabilities
**Distribution Certificate:**
- Serial: `2DA6109E2D8D4A95BFD62BA01532171F`
- Expiration: Tue, 25 Aug 2026 09:57:24 GMT+0700
- Apple Team: C878579W46 (Luan le - Individual)

**Provisioning Profile:**
- ID: `6XNADZT932`
- Status: Active
- Expiration: Tue, 25 Aug 2026 09:57:24 GMT+0700

✅ All credentials ready - EAS auto setup successful

### 8. ⚠️ Functional App Testing
**CẦN TEST TRƯỚC KHI SUBMIT FOR REVIEW:**

#### Test Checklist:
- [ ] App launch không crash
- [ ] Login flow hoạt động
- [ ] Main features hoạt động
- [ ] Navigation không bị lỗi
- [ ] Không có memory leaks
- [ ] Performance tốt (không lag)
- [ ] Orientation support (portrait)
- [ ] iPad support (supportsTablet: true)

#### Test Methods:
1. **TestFlight Internal Testing** (recommended)
   - Vào App Store Connect
   - Add internal testers
   - Test trước khi submit external

2. **Simulator Testing**
   ```bash
   yarn build:ios:preview --platform ios
   ```

---

## 🚀 Next Steps

### Bước 1: Hoàn thành App Privacy
1. Vào https://appstoreconnect.apple.com
2. Chọn "APETechs"
3. Hoàn thành **App Privacy** questionnaire
4. Save changes

### Bước 2: Thêm App Review Information
1. Vào **App Information** → **App Review Information**
2. Thêm demo account credentials
3. Thêm notes for reviewer
4. Save changes

### Bước 3: Internal Testing (Optional nhưng recommended)
1. Vào **TestFlight** tab
2. Add internal testers (team members)
3. Test app thoroughly
4. Fix any bugs found

### Bước 4: External Testing
1. Vào **TestFlight** → **External Testing**
2. Create new group
3. Add external testers
4. Submit for Beta App Review
5. Đợi Apple approve (1-2 days)

### Bước 5: Production Release
1. Sau khi external testing OK
2. Vào **App Store** tab
3. Create new version
4. Fill in all required info:
   - Screenshots (required)
   - Description
   - Keywords
   - Support URL
   - Marketing URL (optional)
5. Submit for App Review
6. Đợi Apple approve (1-7 days)

---

## 📱 Current Build Info

**Build Details:**
- **Build ID:** d680a7a8-dccc-4154-8b27-7570af9670af
- **Platform:** iOS
- **Status:** ✅ Finished
- **Profile:** production
- **Distribution:** store
- **Version:** 1.0.0
- **Build Number:** 3
- **SDK:** 53.0.0
- **Runtime:** 1.0.0

**Links:**
- **Build Logs:** https://expo.dev/accounts/apetechs-dev/projects/apetechs-app/builds/d680a7a8-dccc-4154-8b27-7570af9670af
- **Artifact:** https://expo.dev/artifacts/eas/suhAf8cFd5btCs1ZXUEA5P.ipa
- **Submission:** https://expo.dev/accounts/apetechs-dev/projects/apetechs-app/submissions/4a748092-213d-432e-8d96-0669191a02f7

**Submission Status:**
- ✅ Submitted to App Store Connect
- ASC App ID: 6755058139
- Submission Date: 11/19/2025, 5:24:12 PM

---

## ⚠️ Common Issues & Solutions

### Issue 1: Missing App Privacy
**Error:** "You must complete the app privacy details before you can distribute your app for external testing"

**Solution:**
1. Go to App Store Connect
2. Complete App Privacy questionnaire
3. Save and resubmit

### Issue 2: Missing Demo Account
**Error:** "Your app requires a demo account for review"

**Solution:**
1. Add demo account in App Review Information
2. Make sure account is active and working
3. Provide clear instructions

### Issue 3: App Crashes on Launch
**Error:** App rejected due to crashes

**Solution:**
1. Test thoroughly on TestFlight first
2. Check crash logs in Xcode
3. Fix bugs and resubmit

### Issue 4: Missing Screenshots
**Error:** "You must provide at least one screenshot"

**Solution:**
1. Take screenshots on required device sizes:
   - 6.7" (iPhone 14 Pro Max, 15 Pro Max)
   - 6.5" (iPhone 11 Pro Max, XS Max)
   - 5.5" (iPhone 8 Plus)
2. Upload to App Store Connect

---

## 📞 Support

- **Expo Docs:** https://docs.expo.dev/guides/submit-to-app-store/
- **App Store Connect:** https://appstoreconnect.apple.com
- **Apple Developer:** https://developer.apple.com

---

**Last Updated:** Nov 20, 2025
**Build Version:** 1.0.0 (3)
**Status:** ⚠️ Waiting for App Privacy & Review Info completion
