import { ICustomerAddress } from "~/api/customer/types";
import {
  IAllocateStockRes,
  ICalculationShippingFeeRes,
  ICreateOrderRes,
  IShipTo,
} from "~/api/order/types";

import { IProductItemV2 } from "~/stores/create-sale-order/types";
import { NSOrder } from "../enums";
import i18n from "~/i18n";

const calculatePercentDiscount = ({
  netPrice = 0,
  editedNetPrice = 0,
}: {
  netPrice?: number;
  editedNetPrice?: number;
}) => {
  if (!netPrice) {
    return 0;
  }
  const percentDiscount = ((netPrice - editedNetPrice) / netPrice) * 100;
  return percentDiscount;
};

const calculatePercentDiscountV2 = ({
  netPrice = 0,
  editedNetPrice = 0,
}: {
  netPrice?: number;
  editedNetPrice?: number;
}) => {
  if (!netPrice) {
    return 0;
  }
  const percentDiscount = (1 - editedNetPrice / netPrice) * 100;
  return percentDiscount;
};

/**
 * Tính tỷ lệ số lượng theo đơn vị
 *  là tính tỉ lê 1 oumOut = bao nhiêu oumIn
 * @returns
 */
const calculateRatioQtyByOum = ({
  productItemV2,
  oumIn,
  oumOut,
}: {
  productItemV2: {
    mapUomConfigQty: Record<string, number>;
    master_unit: string;
    uom: string;
  };
  oumIn: string;
  oumOut: string;
}) => {
  const mapUomConfigQty = productItemV2.mapUomConfigQty;
  const oumInConfigQty = mapUomConfigQty[oumIn];
  const oumOutConfigQty = mapUomConfigQty[oumOut];
  if (!oumInConfigQty || !oumOutConfigQty) {
    return 1;
  }
  const masterUnitQty = mapUomConfigQty[productItemV2.master_unit];
  const oumInQty = oumInConfigQty / masterUnitQty;
  const oumOutQty = oumOutConfigQty / masterUnitQty;
  // mô tả: 1 oumOut = ? oumIn
  return oumOutQty / oumInQty;
};

const convertQuantityToMasterUnit = ({
  quantity,
  uom,
  info_uom,
}: {
  quantity: number;
  uom: string;
  info_uom: {
    master_unit: string;
    uom_lv2?: string;
    uom_lv3?: string;
    uom_lv4?: string;
    uom_lv5?: string;
    quantity_level2_exchange?: number;
    quantity_level3_exchange?: number;
    quantity_level4_exchange?: number;
    quantity_level5_exchange?: number;
  };
}): number => {
  const masterUnit = info_uom.master_unit;
  // Nếu UOM là master unit → đã là đơn vị chuẩn
  if (uom === masterUnit) {
    return quantity;
  }
  if (uom === info_uom.uom_lv2) {
    return quantity * (info_uom.quantity_level2_exchange ?? 1);
  }
  if (uom === info_uom.uom_lv3) {
    return quantity * (info_uom.quantity_level3_exchange ?? 1);
  }
  if (uom === info_uom.uom_lv4) {
    return quantity * (info_uom.quantity_level4_exchange ?? 1);
  }
  if (uom === info_uom.uom_lv5) {
    return quantity * (info_uom.quantity_level5_exchange ?? 1);
  }
  return quantity;
};

const convertMasterUnitToQuantity = ({
  master_unit_quantity,
  uom,
  info_uom,
}: {
  master_unit_quantity: number;
  uom: string;
  info_uom: {
    master_unit: string;
    uom_lv2?: string;
    uom_lv3?: string;
    uom_lv4?: string;
    uom_lv5?: string;
    quantity_level2_exchange?: number; // ví dụ: 1 thùng = 12 cái
    quantity_level3_exchange?: number;
    quantity_level4_exchange?: number;
    quantity_level5_exchange?: number;
  };
}): number => {
  const masterUnit = info_uom.master_unit;

  // Nếu muốn convert về chính master_unit → giữ nguyên
  if (uom === masterUnit) {
    return master_unit_quantity;
  }

  // Level 2
  if (uom === info_uom.uom_lv2) {
    const ex = info_uom.quantity_level2_exchange ?? 1;
    return master_unit_quantity / ex;
  }

  // Level 3
  if (uom === info_uom.uom_lv3) {
    const ex = info_uom.quantity_level3_exchange ?? 1;
    return master_unit_quantity / ex;
  }

  // Level 4
  if (uom === info_uom.uom_lv4) {
    const ex = info_uom.quantity_level4_exchange ?? 1;
    return master_unit_quantity / ex;
  }

  // Level 5
  if (uom === info_uom.uom_lv5) {
    const ex = info_uom.quantity_level5_exchange ?? 1;
    return master_unit_quantity / ex;
  }

  return master_unit_quantity;
};

const convertCustomerAddressToShipTo = (
  customerAddress: ICustomerAddress
): IShipTo => {
  return {
    lv0_id: "VN",
    lv0_name: "Việt Nam",
    lv1_id: customerAddress?.sub_division_level1_id,
    lv1_name: customerAddress?.sub_division_level1_name,
    lv2_id: customerAddress?.sub_division_level2_id,
    lv2_name: customerAddress?.sub_division_level2_name,
    lv3_id: customerAddress?.sub_division_level3_id,
    lv3_name: customerAddress?.sub_division_level3_name,
    address1: customerAddress.address,
    phone: customerAddress.phone,
    name: customerAddress.contact,
  };
};

const convertShipToToCustomerAddress = (
  shipTo: IShipTo,
  customer_address_code?: string
): ICustomerAddress => {
  return {
    country_id: shipTo.lv0_id,

    sub_division_level1_id: shipTo?.lv1_id,
    sub_division_level1_name: shipTo?.lv1_name,
    sub_division_level2_id: shipTo?.lv2_id,
    sub_division_level2_name: shipTo?.lv2_name,
    sub_division_level3_id: shipTo?.lv3_id,
    sub_division_level3_name: shipTo?.lv3_name,
    address: shipTo?.address1,

    phone: shipTo?.phone,
    contact: shipTo?.name,
    code:
      customer_address_code ||
      shipTo?.customer_address_code ||
      "DEFAULT_ADDRESS_CODE",
  };
};

const convertContentResponseOrder = (
  response: ICreateOrderRes
): { header: string; content: string } => {
  const header = i18n.t("common.order.create.success.header");

  if (
    response.approval_status === NSOrder.EOrderApprovalStatus.PendingFreight
  ) {
    return {
      header,
      content: i18n.t("common.order.create.success.pendingFreight"),
    };
  }

  if (response.approval_status === NSOrder.EOrderApprovalStatus.PendingPrice) {
    return {
      header,
      content: i18n.t("common.order.create.success.pendingPrice"),
    };
  }

  if (response.approval_status === NSOrder.EOrderApprovalStatus.PendingCredit) {
    return {
      header,
      content: i18n.t("common.order.create.success.pendingCredit"),
    };
  }

  return {
    header,
    content: i18n.t("common.order.create.success.content"),
  };
};

const makeMapSkuWarehouse = (allocateStockData?: IAllocateStockRes[]) => {
  const mapSkuWarehouse: Record<string, string> = {};
  (allocateStockData || [])
    .filter((it) => it?.warehouse?.warehouse_code)
    ?.forEach((item) => {
      const logistic_skus =
        item?.warehouse?.products?.map((item) => item.logistic_sku) || [];

      for (const sku of logistic_skus.filter((sku) => sku)) {
        Object.assign(mapSkuWarehouse, {
          [sku!]: item?.warehouse?.warehouse_code,
        });
      }
    });
  return mapSkuWarehouse;
};

const makeMapSTMDeliveryTime = (
  calculationShippingFeeData?: ICalculationShippingFeeRes
) => {
  const mapSTMDeliveryTime: Record<string, { start: string; end: string }> = {};
  (calculationShippingFeeData?.transit_time_details || [])?.forEach((item) => {
    mapSTMDeliveryTime[`${item.ship_to_code}_${item.logistic_sku}`] = {
      start: item.delivery_time_start,
      end: item.delivery_time_end,
    };
  });
  return mapSTMDeliveryTime;
};

// use shipping_fee_adjusted
const normalizeNumber = (value: number | null, defaultValue: number) => {
  return value !== null ? value : defaultValue;
};

const getPriceUomByMasterUnit = ({
  uomIn,
  uomOut,
  priceUomIn,
  netPriceUomIn,
  uomConfigList,
}: {
  uomIn: string;
  uomOut: string;
  priceUomIn: number;
  netPriceUomIn: number;
  uomConfigList: { code: string; qty: number }[];
}) => {
  const uomInConversionMasterUnitQty = uomConfigList.find(
    (uom) => uom.code === uomIn
  )?.qty;
  const uomOutConversionMasterUnitQty = uomConfigList.find(
    (uom) => uom.code === uomOut
  )?.qty;
  if (!uomInConversionMasterUnitQty || !uomOutConversionMasterUnitQty) {
    return {
      price: 0,
      netPrice: 0,
    };
  }
  const priceMasterUnit = Math.round(priceUomIn / uomInConversionMasterUnitQty);
  const netPriceMasterUnit = Math.round(
    netPriceUomIn / uomInConversionMasterUnitQty
  );
  const priceUomOut = priceMasterUnit * uomOutConversionMasterUnitQty;
  const netPriceUomOut = netPriceMasterUnit * uomOutConversionMasterUnitQty;
  return {
    priceUomOut: Math.round(priceUomOut),
    netPriceUomOut: Math.round(netPriceUomOut),
    netPriceMasterUnit,
    priceMasterUnit,
    uomInConversionMasterUnitQty,
    uomOutConversionMasterUnitQty,
  };
};

export const BusinessHelper = {
  calculatePercentDiscount,
  calculatePercentDiscountV2,
  calculateRatioQtyByOum,
  convertQuantityToMasterUnit,
  convertCustomerAddressToShipTo,
  convertShipToToCustomerAddress,
  makeMapSTMDeliveryTime,
  makeMapSkuWarehouse,
  normalizeNumber,
  convertContentResponseOrder,
  convertMasterUnitToQuantity,
  getPriceUomByMasterUnit,
};
