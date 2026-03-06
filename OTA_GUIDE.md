# 🚀 OTA Deployment Guide

## Quy trình kiểm tra trước khi OTA

### 1. **Kiểm tra TypeScript**

```bash
bun run type-check
```

Kiểm tra lỗi TypeScript trong toàn bộ project.

### 2. **Chạy tất cả validation**

```bash
bun run validate
```

Chạy tất cả các kiểm tra (hiện tại chỉ có type-check, có thể mở rộng thêm lint, test, v.v.)

### 3. **Kiểm tra trước OTA**

```bash
bun run pre-ota
```

Chạy tất cả validation và hiển thị thông báo sẵn sàng cho OTA.

---

## OTA Commands (Đã tích hợp validation)

Các lệnh OTA sau **tự động chạy validation** trước khi deploy:

### Development

```bash
bun run ota:dev
```

### Preview/Staging

```bash
bun run ota:preview
```

### Production

```bash
bun run ota:prod
```

---

## Quy trình làm việc khuyến nghị

### Khi pull code mới về

1. **Cài đặt dependencies**

   ```bash
   bun install
   ```

2. **Kiểm tra TypeScript**

   ```bash
   bun run type-check
   ```

   - ✅ Nếu pass → Tiếp tục
   - ❌ Nếu có lỗi → Fix lỗi trước

3. **Test local**

   ```bash
   bun start
   ```

   Kiểm tra app chạy ổn trên simulator/device

4. **Deploy OTA**

   ```bash
   # Development
   bun run ota:dev
   
   # Preview
   bun run ota:preview
   
   # Production
   bun run ota:prod
   ```

---

## Troubleshooting

### Lỗi TypeScript

```bash
# Xem chi tiết lỗi
bun run type-check

# Thường gặp:
# - Missing types
# - Type mismatch
# - Import errors
```

### Validation failed

- Kiểm tra lỗi TypeScript
- Fix tất cả lỗi trước khi OTA
- Không bỏ qua validation!

### OTA không cập nhật

```bash
# Clear cache và thử lại
bun run ota:dev -- --clear-cache
```

---

## Best Practices

✅ **Luôn chạy validation trước khi OTA**

✅ **Test trên local trước**

✅ **Deploy lên dev/preview trước khi production**

✅ **Kiểm tra app sau khi OTA**

✅ **Có rollback plan**

❌ **Không skip validation**

❌ **Không deploy trực tiếp lên production**

❌ **Không deploy khi có lỗi TypeScript**

---

## Mở rộng thêm validation

Nếu muốn thêm lint hoặc test vào validation, update `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "test": "jest",
    "validate": "bun run type-check && bun run lint && bun run test"
  }
}
```
