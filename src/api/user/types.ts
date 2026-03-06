import { NSUser } from "~/common/enums";


export enum ActivationStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export interface AccessOwner {
  owner_code: string;

  warehouse_access: {
    warehouse_id: number;
    warehouse_code: string;
    status: ActivationStatus;
    is_main?: boolean;
  }[];

  sales_channel_access: {
    sale_channel_id: number;
    shop_ids: string[];
    sale_channel_code: string;
    status: ActivationStatus;
  }[];

  customer_access: {
    customer_id: number;
    customer_code: string;
    customer_name: string;
    customer_address: string;
    image_urls: string | null;
    status: ActivationStatus;
  }[];

  employee_access: {
    code: string;
    email: string;
    status?: ActivationStatus;
  }[];

  shop_access: string[];
  branch_codes: string[];

  status: ActivationStatus;
}


export interface IUserInfo {
  first_login: boolean;
  is_authenticated: boolean;
  id: string;
  user_name: string;
  name: string;
  surname: string;
  phone_number: string;
  phone_number_verified: boolean;
  email: string;
  email_verified: boolean;
  tenant_id: string;
  role: string;
  auth_role?: string;
  permissions: string[];
  client_id: string;
  language_code: string;
  status: NSUser.EStatus;
  logo?: string;
  access_owners?: AccessOwner[];
}
