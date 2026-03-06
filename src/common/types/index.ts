/**
 * Common types used across the application
 */

/**
 * UOM (Unit of Measure) information structure
 * Used for converting quantities between different UOMs
 */
export interface IUomInfo {
  master_unit: string; // đơn vị nhỏ nhất (ví dụ: viên)
  uom_lv2?: string;
  uom_lv3?: string;
  uom_lv4?: string;
  uom_lv5?: string;
  quantity_level2_exchange?: number;
  quantity_level3_exchange?: number;
  quantity_level4_exchange?: number;
  quantity_level5_exchange?: number;
}

