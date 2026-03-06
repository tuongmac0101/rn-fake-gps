# Tech Stack

## Tổng quan

APETechs App là một ứng dụng di động cross-platform được phát triển cho hệ thống quản lý logistics thông minh, sử dụng React Native và Expo framework.

## Core Technologies

### **Frontend Framework**

- **React Native** (v0.79.5) - Framework chính để phát triển ứng dụng di động cross-platform
- **React** (v19.0.0) - Thư viện JavaScript để xây dựng giao diện người dùng
- **Expo** (v53.0.20) - Platform và framework để phát triển ứng dụng React Native

#### **Expo Ecosystem**

Dự án sử dụng Expo như một platform chính với các tính năng:

**Expo Modules được sử dụng:**

- **expo-dev-client** (v5.2.4) - Custom development client thay vì Expo Go
- **expo-font** (v13.3.2) - Quản lý và load custom fonts
- **expo-localization** (v16.1.6) - Hỗ trợ localization và timezone
- **expo-splash-screen** (v0.30.10) - Quản lý splash screen
- **expo-status-bar** (v2.2.3) - Điều khiển status bar
- **expo-updates** (v0.28.17) - Over-the-air (OTA) updates

**Expo Configuration:**

- Sử dụng `app.config.ts` thay vì `app.json` để có dynamic configuration
- Hỗ trợ multiple environments (development, preview, production)
- Tích hợp với EAS (Expo Application Services) cho build và deployment
- Sử dụng Hermes JavaScript engine để tối ưu performance

### **UI Framework & Design System**

- **UI Kitten** (v5.3.1) - Thư viện UI components dựa trên Eva Design System
- **Eva Design** (v2.2.0) - Design system cung cấp theme và styling
- **Eva Icons** (v5.3.1) - Bộ icon tích hợp với UI Kitten

### **Navigation**

- **React Navigation** (v7.x) - Thư viện navigation chính
  - Native Stack Navigator (v7.3.25)
  - Bottom Tabs Navigator (v7.4.6)

### **State Management**

- **Zustand** (v5.0.8) - Thư viện quản lý state nhẹ và đơn giản

### **Networking & API**

- **Axios** (v1.11.0) - HTTP client để gọi API

### **Internationalization**

- **i18next** (v25.4.2) - Framework đa ngôn ngữ
- **react-i18next** (v15.7.2) - React bindings cho i18next
- **expo-localization** - Hỗ trợ localization native

### **Storage**

- **AsyncStorage** (v2.1.2) - Local storage cho React Native

### **Animation & Gestures**

- **React Native Reanimated** (v3.17.4) - Thư viện animation hiệu suất cao
- **React Native Gesture Handler** (v2.24.0) - Xử lý gesture và touch events

### **UI/UX Enhancements**

- **React Native Keyboard Controller** (v1.18.5) - Quản lý keyboard behavior
- **React Native Safe Area Context** (v5.4.0) - Xử lý safe area trên các thiết bị
- **React Native Toast Message** (v2.3.3) - Hiển thị thông báo toast
- **React Native SVG** (v15.11.2) - Hỗ trợ render SVG

## Development Tools

### **Language & Type Safety**

- **TypeScript** (v5.8.3) - Ngôn ngữ lập trình chính với type safety
- **TSX** (v4.20.4) - TypeScript execution engine

### **Build & Deployment**

- **EAS (Expo Application Services)** - Platform build và deploy
- **Hermes** - JavaScript engine để tối ưu hiệu suất
- **Expo Dev Client** - Development client cho testing

### **Package Manager**

- **Bun** - Package manager và runtime nhanh (sử dụng bun.lock)

## Project Structure

```
src/
├── @config/          # Cấu hình ứng dụng và environment
├── @core/            # Core business logic và DTOs
├── @types/           # Type definitions
├── @ui-kit/          # Custom UI components
├── components/       # Shared components
├── hooks/           # Custom React hooks
├── views/           # Screen components
└── ...
```

## Component Architecture

### **Main Layout System**

#### **MainLayout** (`src/views/main/main-layout.tsx`)

Component layout chính của ứng dụng, đóng vai trò là wrapper cho tất cả các màn hình chính:

**Tính năng:**

- **AuthGuard Integration** - Tích hợp bảo vệ authentication cho tất cả routes
- **Conditional TopBar** - Hiển thị TopBarHome dựa trên prop `showTopBarProfile`
- **Flexible Layout** - Sử dụng UI Kitten Layout với flex styling
- **TypeScript Support** - Fully typed với interface `IMainLayoutProps`

**Props:**

- `children: React.ReactNode` - Nội dung màn hình được render
- `showTopBarProfile?: boolean` - Điều khiển hiển thị top bar với profile

### **Shared Components** (`src/components/`)

#### **Layout Components**

**BasicLayout** (`basic-layout/`)

- Component layout cơ bản với safe area support
- **Safe Area Integration** - Sử dụng `KitSafeAreaLayout` và `react-native-safe-area-context`
- **Flexible Configuration** - Có thể bật/tắt safe area, custom edges
- **UI Kitten Compatible** - Extends LayoutProps từ UI Kitten

**BasicTopBar** (`basic-top-bar/`)

- Top bar cơ bản với safe area cho phần trên
- **Safe Area Edges** - Tự động xử lý top, left, right edges
- **Theme Integration** - Sử dụng UI Kitten theme system
- **Customizable Style** - Hỗ trợ custom styling thông qua props

**TopSafeFiller** (`top-safe-filler/`)

- Utility component để fill safe area với màu tùy chỉnh
- **Dynamic Height** - Tự động tính toán height dựa trên device safe area
- **Color Customization** - Nhận prop `color` để set background

#### **Navigation Components**

**TopBarHome** (`top-bar-home/`)

- Top bar chính cho màn hình home với user profile
- **User Information Display** - Hiển thị tên user từ Zustand store
- **Avatar Integration** - Avatar placeholder với person icon
- **Notification Bell** - Button thông báo (sẵn sàng cho tích hợp)
- **Theme Responsive** - Sử dụng primary colors từ theme
- **Localized Greeting** - Hiển thị "Xin chào" với tên user

**TopBarCustomer** (`top-bar-customer/`)

- Top bar chuyên dụng cho các màn hình liên quan đến customer
- **Search Integration** - Built-in search input với icon
- **Back Navigation** - Nút back với navigation callback
- **Dynamic Title** - Title có thể customize qua props
- **Input Handling** - Controlled input với onChangeText callback
- **Consistent Styling** - Giữ consistency với TopBarHome design

#### **List Components**

**ListEmpty** (`list-empty/`)

- Component hiển thị khi danh sách trống
- **Internationalization** - Sử dụng i18next cho đa ngôn ngữ
- **Icon Integration** - Credit card icon làm placeholder
- **Custom Message** - Hỗ trợ custom message hoặc dùng default translation
- **Flexible Height** - Prop `minHeight` để control minimum height
- **Theme Colors** - Sử dụng `text-hint-color` từ theme

**ListFooter** (`list-footer/`)

- Footer component cho pagination loading
- **Loading Indicator** - KitSpinner với size small
- **Loading Message** - Text thông báo loading với i18n support
- **Centered Layout** - Flexbox layout với center alignment
- **Theme Integration** - Sử dụng subtle text color từ theme

### **Component Export Strategy**

Tất cả components được export thông qua `src/components/index.ts` để:

- **Centralized Imports** - Import tập trung từ một file
- **Clean Architecture** - Tách biệt internal structure với external API
- **Easy Maintenance** - Dễ dàng thêm/xóa components

## Build Profiles

Dự án hỗ trợ nhiều môi trường build:

- **Local** - Development với simulator
- **Development** - Internal testing
- **Preview** - Pre-production testing
- **Production** - Production release

## Key Features

- **Cross-platform** - Chạy trên cả iOS và Android
- **Multi-language** - Hỗ trợ đa ngôn ngữ với i18next
- **Modern UI** - Sử dụng Eva Design System
- **Type-safe** - TypeScript cho code quality
- **Performance** - Hermes engine và Reanimated
- **OTA Updates** - Over-the-air updates với Expo
