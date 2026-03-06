// ~/api/customer/types.ts
import { NSOrder } from "~/common/enums";
import { IPageRequest } from "../@common";
export interface ICustomer {
  customer_id?: number | null;
  customer_code: string;
  customer_name: string;
  customer_address?: string;
  owner: string;
  image_urls: string[];
  default_address?: {
    address?: string;
    country_id?: string;
    country_name?: string;
    sub_division_level1_id?: string;
    sub_division_level1_name?: string;
    sub_division_level2_id?: string;
    sub_division_level2_name?: string;
    sub_division_level3_id?: string;
    sub_division_level3_name?: string;
    contact?: string;
    phone?: string;
    tax_number?: string;
  };
}

export interface ICustomerReq extends IPageRequest {
  text_search?: string;
  limit?: number;
  order_type?: NSOrder.EOrderType;
  susr01?: string; // Mặt định KH
  branch_code?: string; 
  only_active?: boolean; // chỉ get customer có status = Active
}

export interface ICustomerAddress {
  id?: number;
  code: string;
  address?: string;
  country_id?: string;
  sub_division_level1_id?: string;
  sub_division_level2_id?: string;
  sub_division_level3_id?: string;
  description?: string;
  note?: string; // note cua dia chi
  contact?: string;
  phone?: string;
  status?: string;
  created_by?: string;
  updated_by?: string;
  created_date?: string;
  updated_date?: string;
  sub_division_level1_name?: string;
  sub_division_level2_name?: string;
  sub_division_level3_name?: string;
  is_default?: boolean;
  // "opening_time": "09:40:00",
  // "closing_time": "19:00:00",
  opening_time?: string;
  closing_time?: string;
  max_load?: number;
}

export interface ICustomerAddressReq {
  customer_id?: number | null;
  customer_address_id?: number;
  contact?: string;
  phone?: string;
  country_name?: string;
  sub_division_level1_id?: string;
  sub_division_level2_id?: string;
  sub_division_level3_id?: string;
  sub_division_level1_name?: string;
  sub_division_level2_name?: string;
  sub_division_level3_name?: string;
  address?: string;
  note?: string;
  opening_time?: string;
  closing_time?: string;
  max_load?: number | null;
}

export interface ICustomerEditReq {
  customer_id: number;
  code: string;
  name: string;
  address: string;
  country_id: string;
  country_name: string;
  sub_division_level1_id: string;
  sub_division_level1_name: string;
  sub_division_level3_id: string;
  sub_division_level3_name: string;
  contact: string;
  phone: string;
  tax_number: string;
  status: string;
  owner: string;
}

export interface IPriceList {}
