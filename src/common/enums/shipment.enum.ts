export namespace NSShipment {
    export enum EShipmentStatus {
        InProgress = "InProgress",
        Cancelled = "Cancelled",
        Completed = "Completed",
        PartiallyDelivered = "PartiallyDelivered",
        FullyDelivered = "FullyDelivered",
        Delivered = "Delivered",
        Shipped = "Shipped",
        New = "New",
        Created = "Created",
        Approved = "Approved",
    }

    

    export enum EShipmentMobileDisplayStatus {
        AwaitingShipping = "AwaitingShipping",
        Shipped = "Shipped",
        Delivering = "Delivering",
        Completed = "Completed",
        Cancelled = "Cancelled"
    }

    export const ESHIPMENT_MOBILE_DISPLAY_STATUS_LABEL = {
        [EShipmentMobileDisplayStatus.AwaitingShipping]: "enum.NSShipment.EShipmentMobileDisplayStatus.AwaitingShipping",
        [EShipmentMobileDisplayStatus.Shipped]: "enum.NSShipment.EShipmentMobileDisplayStatus.Shipped",
        [EShipmentMobileDisplayStatus.Delivering]: "enum.NSShipment.EShipmentMobileDisplayStatus.Delivering",
        [EShipmentMobileDisplayStatus.Completed]: "enum.NSShipment.EShipmentMobileDisplayStatus.Completed",
        [EShipmentMobileDisplayStatus.Cancelled]: "enum.NSShipment.EShipmentMobileDisplayStatus.Cancelled",
    } as const;

    export const ESHIPMENT_MOBILE_DISPLAY_STATUS_LABEL_COLOR = {
        [EShipmentMobileDisplayStatus.AwaitingShipping]: "#9a9a9aff", // Xám - Chờ xuất kho
        [EShipmentMobileDisplayStatus.Shipped]: "blue", // Xanh dương - Đã xuất kho
        [EShipmentMobileDisplayStatus.Delivering]: "blue", // Xanh dương - Đang giao hàng
        [EShipmentMobileDisplayStatus.Completed]: "green", // Xanh lá - Hoàn thành
        [EShipmentMobileDisplayStatus.Cancelled]: "red", // Đỏ - Đã hủy
    } as const;

    export const ESHIPMENT_STATUS_LABEL = {
        [EShipmentStatus.InProgress]: "enum.NSShipment.EShipmentStatus.InProgress",
        [EShipmentStatus.Cancelled]: "enum.NSShipment.EShipmentStatus.Cancelled",
        [EShipmentStatus.Completed]: "enum.NSShipment.EShipmentStatus.Completed",
        [EShipmentStatus.PartiallyDelivered]: "enum.NSShipment.EShipmentStatus.PartiallyDelivered",
        [EShipmentStatus.FullyDelivered]: "enum.NSShipment.EShipmentStatus.FullyDelivered",
        [EShipmentStatus.Delivered]: "enum.NSShipment.EShipmentStatus.Delivered",
        [EShipmentStatus.Shipped]: "enum.NSShipment.EShipmentStatus.Shipped",
        [EShipmentStatus.New]: "enum.NSShipment.EShipmentStatus.New",
        [EShipmentStatus.Created]: "enum.NSShipment.EShipmentStatus.Created",
        [EShipmentStatus.Approved]: "enum.NSShipment.EShipmentStatus.Approved",
    } as const;
    export const ESHIPMENT_STATUS_STYLE = {
        [EShipmentStatus.Delivered]: "#00695C",
        [EShipmentStatus.FullyDelivered]: "#00695C",
        [EShipmentStatus.Completed]: "#00695C",
        [EShipmentStatus.Cancelled]: "#C62828",
        [EShipmentStatus.Shipped]: "#E65100",
        [EShipmentStatus.InProgress]: "#E65100",
        [EShipmentStatus.PartiallyDelivered]: "#E65100",
        [EShipmentStatus.New]: "#1565C0",
        [EShipmentStatus.Created]: "#1565C0",
        [EShipmentStatus.Approved]: "#1565C0",
    } as const;

    export enum EShipmentDeliveryMethod {
        Delivery = "delivery",
        Pickup = "pickup",
    }
    export const ESHIPMENT_DELIVERY_METHOD_LABEL = {
        [EShipmentDeliveryMethod.Delivery]: "enum.NSShipment.EShipmentDeliveryMethod.Delivery",
        [EShipmentDeliveryMethod.Pickup]: "enum.NSShipment.EShipmentDeliveryMethod.Pickup",
    }
    export const ESHIPMENT_DELIVERY_METHOD_STYLE = {
        [EShipmentDeliveryMethod.Delivery]: "#00695C",
        [EShipmentDeliveryMethod.Pickup]: "#E65100",

    }
}
