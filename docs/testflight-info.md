# TestFlight Beta App Information

## Test Information

### Beta App Description

Đây là phiên bản beta của **APETechs (Sale Order Management)** - ứng dụng quản lý đơn hàng bán hàng di động dành cho hệ thống logistics thông minh.

**Mô tả ứng dụng:**

APETechs App giúp nhân viên bán hàng và quản lý đơn hàng thực hiện các công việc nghiệp vụ trên thiết bị di động. Ứng dụng cung cấp các tính năng chính:

- Quản lý khách hàng: Xem danh sách, chi tiết khách hàng, quản lý địa chỉ giao hàng
- Quản lý đơn hàng: Tạo đơn hàng mới, xem chi tiết, quản lý đơn hàng trả lại, phê duyệt đơn hàng
- Quản lý sản phẩm: Tìm kiếm SKU, xem thông tin sản phẩm, quản lý giá và tồn kho
- Quản lý giao hàng: Xem chi tiết lô hàng, quản lý kế hoạch giao hàng, phân bổ giao hàng
- Thanh toán và vận chuyển: Quản lý phương thức thanh toán, tính toán phí vận chuyển
- Hệ thống: Đăng nhập SSO, quản lý hồ sơ, đa ngôn ngữ, theme

**Yêu cầu test:**

Vui lòng test các tính năng: đăng nhập, xem danh sách khách hàng, tạo đơn hàng, tìm kiếm sản phẩm, quản lý địa chỉ giao hàng, và báo lỗi nếu có.

**Lưu ý:** Ứng dụng yêu cầu kết nối internet để hoạt động.

**Phiên bản:** Beta 1.0.0  
**Platform:** iOS  
**Package ID:** com.apetechs

---

## What to Test

Vui lòng tập trung test các tính năng sau trong build này:

**1. Đăng nhập và xác thực:**
- Đăng nhập bằng tài khoản: apetechs.sale@gmail.com / Password@123
- Kiểm tra tự động đăng nhập khi đã có token
- Test chức năng đăng xuất

**2. Quản lý khách hàng:**
- Xem danh sách khách hàng
- Tìm kiếm và lọc khách hàng
- Xem chi tiết thông tin khách hàng
- Quản lý địa chỉ giao hàng (thêm, sửa, xóa)

**3. Tạo và quản lý đơn hàng:**
- Tạo đơn hàng mới với nhiều sản phẩm
- Tìm kiếm sản phẩm (SKU)
- Thêm sản phẩm vào giỏ hàng
- Chọn loại giá (Price Type)
- Tính toán phí vận chuyển
- Xem tóm tắt đơn hàng trước khi xác nhận
- Xem chi tiết đơn hàng đã tạo

**4. Quản lý đơn hàng:**
- Xem danh sách đơn hàng
- Xem chi tiết đơn hàng
- Phê duyệt đơn hàng (nếu có quyền)
- Quản lý đơn hàng trả lại

**5. Giao diện và trải nghiệm:**
- Chuyển đổi ngôn ngữ (nếu có)
- Chuyển đổi theme (Light/Dark mode)
- Điều hướng giữa các màn hình
- Kiểm tra hiệu năng và tốc độ phản hồi

**6. Xử lý lỗi:**
- Test các trường hợp lỗi mạng
- Test validation form
- Kiểm tra thông báo lỗi hiển thị đúng

**Lưu ý khi test:**
- Ứng dụng yêu cầu kết nối internet
- Nếu gặp lỗi, vui lòng chụp màn hình và mô tả các bước để tái hiện lỗi
- Báo cáo bất kỳ vấn đề nào về hiệu năng hoặc giao diện

---

## Contact Information

### First Name
**[Điền tên của bạn]**

### Last Name
**[Điền họ của bạn]**

### Phone Number
**[Điền số điện thoại liên hệ]**

### Email
**[Điền email liên hệ của bạn]**

---

## Sign-In Information

### User Name
**apetechs.sale@gmail.com**

### Password
**Password@123**

---
