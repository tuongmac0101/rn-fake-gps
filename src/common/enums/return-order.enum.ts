export namespace NSReturnOrder {
  export enum EReturnOrderType {
    QualityClaim = "QualityClaim",
    ReturnBroken = "ReturnBroken",
    CustomerReturn = "CustomerReturn",
  }

  export enum EReturnOrderStatus {
    // PendingApprovalRequest = 'PendingApprovalRequest',
    PendingApproval = "PendingApproval",
    // RejectedApproval = 'RejectedApproval',
    // New = 'New',
    // Approved = 'Approved',
    InProgress = "InProgress",
    // Returning = 'Returning',
    Returned = "Returned",
    // FailedReturn = 'FailedReturn',
    // Refunded = 'Refunded',
    // RefundRejected = 'RefundRejected',
    Cancel = "Cancel",
    PartialReturn = "PartialReturn",
  }

  export const ERETURN_ORDER_STATUS_LABEL_COLOR = {
    [EReturnOrderStatus.PendingApproval]: "#D9A38F", // Màu Cam Đất/Hồng Đất (Terracotta) - Giữ nguyên
    [EReturnOrderStatus.InProgress]: "#3B82F6", // Màu xanh dương
    [EReturnOrderStatus.PartialReturn]: "#F59E0B", // Màu cam
    [EReturnOrderStatus.Returned]: "#10B981", // Màu xanh lá
    [EReturnOrderStatus.Cancel]: "#EF4444", // Màu đỏ
  } as const;

  export const ERETURN_ORDER_TYPE_LABEL = {
    [EReturnOrderType.CustomerReturn]:
      "enum.NSReturnOrder.EReturnType.CustomerReturn",
    [EReturnOrderType.QualityClaim]:
      "enum.NSReturnOrder.EReturnType.QualityClaim",
    [EReturnOrderType.ReturnBroken]:
      "enum.NSReturnOrder.EReturnType.ReturnBroken",
  } as const;

  export const ERETURN_ORDER_STATUS_LABEL = {
    [EReturnOrderStatus.PendingApproval]:
      "enum.NSReturnOrder.EReturnOrderStatus.PendingApproval",
    [EReturnOrderStatus.InProgress]:
      "enum.NSReturnOrder.EReturnOrderStatus.InProgress",
    [EReturnOrderStatus.PartialReturn]:
      "enum.NSReturnOrder.EReturnOrderStatus.PartialReturn",
    [EReturnOrderStatus.Returned]:
      "enum.NSReturnOrder.EReturnOrderStatus.Returned",
    [EReturnOrderStatus.Cancel]:
      "enum.NSReturnOrder.EReturnOrderStatus.Cancel",
  } as const;
}
