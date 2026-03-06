import { NSReturnOrder } from './return-order.enum';
export namespace NSOrder {
  /**
   * XB | category = OutboundOrder | Đơn bán
   * XM | category = OutboundOrder | Xuất mẫu
   * XKG | category = OutboundOrder | Ký gửi
   * NTH | category = InboundOrder | Thu hồi
   */
  export enum EOrderType {
    XB = "XB",
    XM = "XM",
    XKG = "XKG",
    NTH = "NTH",
    XDT = "XDT", // Xuất đổi trả
    PASSIVENTH = "PASSIVENTH" // cái này tạo không phải dùng enum mà để cho nó đồng bộ với các hoạt động ở màn hình home
  }

  export const EORDER_TYPE_LABEL = {
    [EOrderType.XB]: "enum.NSOrder.EOrderType.XB",
    [EOrderType.XM]: "enum.NSOrder.EOrderType.XM",
    [EOrderType.XKG]: "enum.NSOrder.EOrderType.XKG",
    [EOrderType.NTH]: "enum.NSOrder.EOrderType.NTH",
    [EOrderType.XDT]: "enum.NSOrder.EOrderType.XDT",
    [EOrderType.PASSIVENTH]: "khong co sai",
  } as const;

  export const EORDER_TYPE_LABEL_COLOR = {
    [EOrderType.XB]: "green",
    [EOrderType.XM]: "blue",
    [EOrderType.XKG]: "orange",
    [EOrderType.NTH]: "red",
    [EOrderType.XDT]: "purple", // Xuất đổi trả
  } as const;

  // ====================== NEW ENUMS ======================

  /** Phương thức vận chuyển
   * XA: Xá
   * PALLET: Pallet
   */
  export enum EShippingMethod {
    XA = "XA", // Xá
    PALLET = "PALLET", // Pallet
  }

  export const ESHIPPING_METHOD_LABEL = {
    [EShippingMethod.XA]: "enum.NSOrder.EShippingMethod.XA",
    [EShippingMethod.PALLET]: "enum.NSOrder.EShippingMethod.PALLET",
  } as const;

  /** Hình thức giao hàng
   * DELIVERY: Giao hàng
   * PICKUP: Lấy tại kho
   */
  export enum EDeliveryMethod {
    DELIVERY = "delivery", // Giao hàng
    PICKUP = "pickup", // Lấy tại kho
  }

  export enum EDeliveryMethodV2 {
    DELIVERY = "delivery", // Đến lấy hàng
    PICKUP = "pickup", // Lấy hàng tại kho
  }

  export const EDELIVERY_METHOD_LABEL = {
    [EDeliveryMethod.DELIVERY]: "enum.NSOrder.EDeliveryMethod.DELIVERY",
    [EDeliveryMethod.PICKUP]: "enum.NSOrder.EDeliveryMethod.PICKUP",
  } as const;

  export const EDELIVERY_METHOD_LABEL_V2 = {
    [EDeliveryMethod.DELIVERY]: "enum.NSOrder.EDeliveryMethodV2.DELIVERY",
    [EDeliveryMethod.PICKUP]: "enum.NSOrder.EDeliveryMethodV2.PICKUP",
  } as const;

  /** Hình thức thanh toán
   * IMMEDIATE: Thanh toán ngay
   * PREPAID: Trả trước
   * CREDIT: Công nợ
   */
  export enum EPaymentMethod {
    IMMEDIATE = "immediate", // Thanh toán ngay
    PREPAID = "prepaid", // Trả trước
    CREDIT = "credit", // Công nợ
  }

  export const EPAYMENT_METHOD_LABEL = {
    [EPaymentMethod.IMMEDIATE]: "enum.NSOrder.EPaymentMethod.IMMEDIATE",
    [EPaymentMethod.PREPAID]: "enum.NSOrder.EPaymentMethod.PREPAID",
    [EPaymentMethod.CREDIT]: "enum.NSOrder.EPaymentMethod.CREDIT",
  } as const;

  export enum EOrderApprovalStatus {
    PendingFreight = "PendingFreight", // Chờ duyệt phí vận chuyển
    PendingPrice = "PendingPrice", // Chờ duyệt giá
    PendingCredit = "PendingCredit", // Chờ duyệt giá công nợ
    PendingApproval = "PendingApproval", // Chờ duyệt (dùng cho đơn xuất mẫu)
    Completed = "Completed", // Hoàn thành
    FreightRejected = "FreightRejected", // Từ chối phí vận chuyển
    PriceRejected = "PriceRejected", // Từ chối giá
    RejectedCredit = "RejectedCredit", // Từ chối giá công nợ"
  }

  export const EORDER_APPROVAL_STATUS_LABEL = {
    [EOrderApprovalStatus.PendingFreight]:
      "enum.NSOrder.EOrderApprovalStatus.PendingFreight",
    [EOrderApprovalStatus.PendingPrice]:
      "enum.NSOrder.EOrderApprovalStatus.PendingPrice",
    [EOrderApprovalStatus.PendingCredit]:
      "enum.NSOrder.EOrderApprovalStatus.PendingCredit",
    [EOrderApprovalStatus.PendingApproval]:
      "enum.NSOrder.EOrderApprovalStatus.PendingApproval",
    [EOrderApprovalStatus.Completed]:
      "enum.NSOrder.EOrderApprovalStatus.Completed",
    [EOrderApprovalStatus.FreightRejected]:
      "enum.NSOrder.EOrderApprovalStatus.FreightRejected",
    [EOrderApprovalStatus.PriceRejected]:
      "enum.NSOrder.EOrderApprovalStatus.PriceRejected",
    [EOrderApprovalStatus.RejectedCredit]:
      "enum.NSOrder.EOrderApprovalStatus.RejectedCredit",
  } as const;

  export const EORDER_APPROVAL_STATUS_LABEL_COLOR = {
    [EOrderApprovalStatus.PendingFreight]: "#D9A38F", // Màu Cam Đất/Hồng Đất (Terracotta) - Giữ nguyên
    [EOrderApprovalStatus.PendingPrice]: "#A5C0E0", // Xanh Dương Nhạt (Dusty Blue) - Đang xem xét
    [EOrderApprovalStatus.PendingCredit]: "#D9B38F", // Vàng Nhạt/Be (Dusty Yellow/Beige) - Chờ tín dụng
    [EOrderApprovalStatus.PendingApproval]: "#D9A38F", // Màu Cam Đất/Hồng Đất (Terracotta) - Chờ duyệt
    [EOrderApprovalStatus.Completed]: "#9BC5A5", // Xanh Lá Ô-liu Nhạt (Muted Green) - Hoàn thành
    [EOrderApprovalStatus.FreightRejected]: "#C59B9B", // Đỏ Đất (Muted Red/Brick) - Từ chối
    [EOrderApprovalStatus.PriceRejected]: "#C59B9B", // Đỏ Đất (Muted Red/Brick) - Từ chối
    [EOrderApprovalStatus.RejectedCredit]: "#C59B9A", // Đỏ Đất (Muted Red/Brick) -
  } as const;

  export enum EOrderPendingStatus {
    PendingFreight = EOrderApprovalStatus.PendingFreight, // Chờ duyệt phí vận chuyển
    PendingPrice = EOrderApprovalStatus.PendingPrice, // Chờ duyệt giá
    PendingCredit = EOrderApprovalStatus.PendingCredit, // Chờ duyệt giá công nợ
    PendingApproval = EOrderApprovalStatus.PendingApproval, // Chờ duyệt xuất mẫu
    ReturnOrderPendingApproval = NSReturnOrder.EReturnOrderStatus.PendingApproval // Chờ duyệt thu hồi 
  }

  export enum EOrderStatus {
    Pending = "Pending", // chờ duyệt
    Opperated = "Opperated", // Vận hành
    Approved = "Approved", // đã duyệt
  }

  export enum EOrderMobileDisplayStatus {
    Created = "Created",
    Approved = "Approved",
    AwaitingShipping = "AwaitingShipping",
    Shipped = "Shipped",
    Delivering = "Delivering",
    Completed = "Completed",
    Cancelled = "Cancelled"
  }

  export const EORDER_MOBILE_DISPLAY_STATUS_LABEL = {
    [EOrderMobileDisplayStatus.Created]: "enum.NSOrder.EOrderMobileDisplayStatus.Created",
    [EOrderMobileDisplayStatus.Approved]: "enum.NSOrder.EOrderMobileDisplayStatus.Approved",
    [EOrderMobileDisplayStatus.AwaitingShipping]: "enum.NSOrder.EOrderMobileDisplayStatus.AwaitingShipping",
    [EOrderMobileDisplayStatus.Shipped]: "enum.NSOrder.EOrderMobileDisplayStatus.Shipped",
    [EOrderMobileDisplayStatus.Delivering]: "enum.NSOrder.EOrderMobileDisplayStatus.Delivering",
    [EOrderMobileDisplayStatus.Completed]: "enum.NSOrder.EOrderMobileDisplayStatus.Completed",
    [EOrderMobileDisplayStatus.Cancelled]: "enum.NSOrder.EOrderMobileDisplayStatus.Cancelled",
  } as const;

  export const EORDER_MOBILE_DISPLAY_STATUS_LABEL_COLOR = {
    [EOrderMobileDisplayStatus.Created]: "#9a9a9aff", // Xám - Tạo mới
    [EOrderMobileDisplayStatus.Approved]: "green", // Xanh lá - Đã duyệt
    [EOrderMobileDisplayStatus.AwaitingShipping]: "#D46B08", // Cam - Chờ giao hàng
    [EOrderMobileDisplayStatus.Shipped]: "blue", // Xanh dương - Đã giao hàng
    [EOrderMobileDisplayStatus.Delivering]: "blue", // Xanh dương - Đang giao hàng
    [EOrderMobileDisplayStatus.Completed]: "green", // Xanh lá - Hoàn thành
    [EOrderMobileDisplayStatus.Cancelled]: "red", // Đỏ - Đã hủy
  } as const;

  export const EORDER_STATUS_LABEL = {
    [EOrderStatus.Pending]: "enum.NSOrder.EOrderStatus.Pending",
    [EOrderStatus.Opperated]: "enum.NSOrder.EOrderStatus.Opperated",
    [EOrderStatus.Approved]: "enum.NSOrder.EOrderStatus.Approved",
  } as const;

  export const EORDER_STATUS_LABEL_COLOR = {
    [EOrderStatus.Pending]: "yellow",
    [EOrderStatus.Opperated]: "blue",
    [EOrderStatus.Approved]: "green",
  } as const;

  export enum EOrderStatusV2 {
    Created = "Created",
    Inprocess = "Inprocess",
    Completed = "Completed",
    Cancelled = "Cancelled",
    PartiallyDelivered = "PartiallyDelivered", // Sử dụng cho đơn hàng có nhiều shipto
    FullyDelivered = "FullyDelivered", // Sử dụng cho đơn hàng có nhiều shipto
    SampleExported = "SampleExported", // Đã xuất mẫu ( sử dụng cho đơn xuất mẫu unis ( order b2b ))
    SamplePasted = "SamplePasted", // Đã dán mẫu ( sử dụng cho đơn xuất mẫu unis ( order b2b ))
  }

  export const EORDER_STATUS_V2_LABEL = {
    [EOrderStatusV2.Created]: "enum.NSOrder.EOrderStatusV2.Created",
    [EOrderStatusV2.Inprocess]: "enum.NSOrder.EOrderStatusV2.Inprocess",
    [EOrderStatusV2.Completed]: "enum.NSOrder.EOrderStatusV2.Completed",
    [EOrderStatusV2.Cancelled]: "enum.NSOrder.EOrderStatusV2.Cancelled",
    [EOrderStatusV2.PartiallyDelivered]:
      "enum.NSOrder.EOrderStatusV2.PartiallyDelivered",
    [EOrderStatusV2.FullyDelivered]:
      "enum.NSOrder.EOrderStatusV2.FullyDelivered",
    [EOrderStatusV2.SampleExported]:
      "enum.NSOrder.EOrderStatusV2.SampleExported",
    [EOrderStatusV2.SamplePasted]: "enum.NSOrder.EOrderStatusV2.SamplePasted",
  } as const;

  export const EORDER_STATUS_V2_LABEL_COLOR = {
    [EOrderStatusV2.Created]: "#9a9a9aff",
    [EOrderStatusV2.Inprocess]: "blue",
    [EOrderStatusV2.Completed]: "green",
    [EOrderStatusV2.Cancelled]: "red",
    [EOrderStatusV2.PartiallyDelivered]: "#D46B08",
    [EOrderStatusV2.FullyDelivered]: "green",
    [EOrderStatusV2.SampleExported]: "blue",
    [EOrderStatusV2.SamplePasted]: "green",
  } as const;

  //   PendingApproval /Chờ duyệt phí vận chuyển
  // ApprovalRejected /Từ chối phí vận chuyển
  // Approved /Đã duyệt
  // Shipped/Đang giao hàng
  // Cancelled /Hủy
  // PartiallyDelivered /Giao một phần
  // FullyDelivered /Giao toàn phần
  export enum EShipmentPlanStatus {
    PendingApproval = "PendingApproval", // Chờ duyệt phí vận chuyển
    ApprovalRejected = "ApprovalRejected", // Từ chối phí vận chuyển
    Approved = "Approved", // Đã duyệt
    Shipped = "Shipped", // Đang giao hàng
    Cancelled = "Cancelled", // Hủy
    PartiallyDelivered = "PartiallyDelivered", // Giao một phần
    FullyDelivered = "FullyDelivered", // Giao toàn phần
  }

  export const ESHIPMENT_PLAN_STATUS_LABEL = {
    [EShipmentPlanStatus.PendingApproval]:
      "enum.NSOrder.EShipmentPlanStatus.PendingApproval",
    [EShipmentPlanStatus.ApprovalRejected]:
      "enum.NSOrder.EShipmentPlanStatus.ApprovalRejected",
    [EShipmentPlanStatus.Approved]: "enum.NSOrder.EShipmentPlanStatus.Approved",
    [EShipmentPlanStatus.Shipped]: "enum.NSOrder.EShipmentPlanStatus.Shipped",
    [EShipmentPlanStatus.Cancelled]:
      "enum.NSOrder.EShipmentPlanStatus.Cancelled",
    [EShipmentPlanStatus.PartiallyDelivered]:
      "enum.NSOrder.EShipmentPlanStatus.PartiallyDelivered",
    [EShipmentPlanStatus.FullyDelivered]:
      "enum.NSOrder.EShipmentPlanStatus.FullyDelivered",
  } as const;

  export const ESHIPMENT_PLAN_STATUS_LABEL_COLOR = {
    [EShipmentPlanStatus.PendingApproval]: "#D46B08",
    [EShipmentPlanStatus.ApprovalRejected]: "red",
    [EShipmentPlanStatus.Approved]: "green",
    [EShipmentPlanStatus.Shipped]: "blue",
    [EShipmentPlanStatus.Cancelled]: "red",
    [EShipmentPlanStatus.PartiallyDelivered]: "#D46B08",
    [EShipmentPlanStatus.FullyDelivered]: "green",
  } as const;

  export enum EShipmentPlanMobileDisplayStatus {
    PendingApproval = "PendingApproval",
    ApprovalRejected = "ApprovalRejected",
    Approved = "Approved",
    AwaitingShipping = "AwaitingShipping",
    Shipped = "Shipped",
    Delivering = "Delivering",
    Completed = "Completed",
    Cancelled = "Cancelled",
  }

  export const ESHIPMENT_PLAN_MOBILE_DISPLAY_STATUS_LABEL = {
    [EShipmentPlanMobileDisplayStatus.PendingApproval]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.PendingApproval",
    [EShipmentPlanMobileDisplayStatus.ApprovalRejected]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.ApprovalRejected",
    [EShipmentPlanMobileDisplayStatus.Approved]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.Approved",
    [EShipmentPlanMobileDisplayStatus.AwaitingShipping]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.AwaitingShipping",
    [EShipmentPlanMobileDisplayStatus.Shipped]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.Shipped",
    [EShipmentPlanMobileDisplayStatus.Delivering]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.Delivering",
    [EShipmentPlanMobileDisplayStatus.Completed]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.Completed",
    [EShipmentPlanMobileDisplayStatus.Cancelled]: "enum.NSOrder.EShipmentPlanMobileDisplayStatus.Cancelled",
  } as const;

  export const ESHIPMENT_PLAN_MOBILE_DISPLAY_STATUS_LABEL_COLOR = {
    [EShipmentPlanMobileDisplayStatus.PendingApproval]: "#D46B08", // Cam - Chờ duyệt phí vận chuyển
    [EShipmentPlanMobileDisplayStatus.ApprovalRejected]: "red", // Đỏ - Từ chối phí vận chuyển
    [EShipmentPlanMobileDisplayStatus.Approved]: "green", // Xanh lá - Đã duyệt
    [EShipmentPlanMobileDisplayStatus.AwaitingShipping]: "#9a9a9aff", // Xám - Chờ xuất kho
    [EShipmentPlanMobileDisplayStatus.Shipped]: "blue", // Xanh dương - Đã xuất kho
    [EShipmentPlanMobileDisplayStatus.Delivering]: "blue", // Xanh dương - Đang giao hàng
    [EShipmentPlanMobileDisplayStatus.Completed]: "pink", // Xanh lá - Hoàn thành
    [EShipmentPlanMobileDisplayStatus.Cancelled]: "red", // Đỏ - Hủy
  } as const;
}
