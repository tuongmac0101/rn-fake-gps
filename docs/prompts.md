Tech stack:

- React native
- React query
- @ui-kitten
- Typescript

## Input giả định

Giả sử các hàm fetch:

- getProducts
- addProduct
- editProduct
- deleteProduct
  Giả lập đã có sẵn không cần triển khai code.

## Kiểu dữ liệu

Types:
PageRequest: { pageIndex: number, pageSize: number , keyword?: string}
Product: { id: number, name: string, price: number }
ProductResponse: { data: Product[], total: number }

## Mô tả UI và UX

DemoView:

- Danh sách products có phân trang load khi scroll với FlatList next pageIndex
- Search products với debounce 500ms
- Add product
- Edit product
- Delete product
  Các action form đều loading lại danh sách products

## Style code:

- Viết các hook thành file riêng và hạn chế xài state trong view mà chỉ xài hook
  (Có 2 khuyến nghị về file hook
  1- Có 1 hook là useProducts.ts trong đó chứa các query và mutation liên quan đến products
  2- Có 1 hook chính là useProductView.ts trong đó chứa các logic của view và 4 hook khác là useProductList (cái này chứa cả search và logic phân trang dạng scroll next pageIndex), useAddProduct, useEditProduct, useDeleteProduct trong đó chứa các logic của các form
  )

## Yêu cầu :

Viết các file thành dạng code block
