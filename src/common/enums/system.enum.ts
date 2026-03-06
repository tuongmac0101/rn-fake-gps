export namespace NSSystem {
  // Get từ api/mobile/system-code có category = ShippingMethod
  // Get từ api/mobile/system-code có category = ShippingService
  // Get từ api/mobile/system-code có category = PaymentMethod

  export enum ECategory {
    SHIPPING_METHOD = "ShippingMethod",
    SHIPPING_SERVICE = "ShippingService",
    PAYMENT_METHOD = "PaymentMethod",
    PRICE = "Price",
  }

  export const ECATEGORY_LABEL = {
    [ECategory.SHIPPING_METHOD]: "enum.NSSystem.ECategory.SHIPPING_METHOD",
    [ECategory.SHIPPING_SERVICE]: "enum.NSSystem.ECategory.SHIPPING_SERVICE",
    [ECategory.PAYMENT_METHOD]: "enum.NSSystem.ECategory.PAYMENT_METHOD",
  } as const;
}
