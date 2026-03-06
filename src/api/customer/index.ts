// ~/api/customer/index.ts
import { rootApiConnector } from "~/connectors";
import { IPageResponse } from "~/api/@common/types";
import {
  ICustomer,
  ICustomerAddress,
  ICustomerAddressReq,
  ICustomerEditReq,
  ICustomerReq,
} from "./types";

const DEFAULT_URL_IMAGE = "https://placehold.co/500x500/orange/white.png";

class CustomerApi {
  public ENDPOINT = {
    EDIT: "api/mobile/customers",
    LIST: "api/mobile/customers",
    EDIT_ADDRESS: "api/mobile/customers/customer-addresses",
    DELETE_ADDRESS: (customer_code: string) =>
      `api/mobile/customers/${customer_code}/customer-addresses`,
  };
  getList = async (
    params?: ICustomerReq
  ): Promise<IPageResponse<ICustomer>> => {
    // await new Promise((resolve) => setTimeout(resolve, 20 * 1000));
    console.log("PARAM GET LIST CUSTOMER: ", JSON.stringify(params));
    const res = await rootApiConnector.get<IPageResponse<ICustomer>>(
      this.ENDPOINT.LIST,
      params
    );

    return {
      ...res,
      data: res.data.map((item) => {
        if (!item.image_urls || item.image_urls.length === 0) {
          Object.assign(item, {
            image_urls: [`${DEFAULT_URL_IMAGE}?text=${item.customer_name}`],
          });
        } else {
          Object.assign(item, {
            image_urls: item.image_urls.filter((url) => url.includes("http")),
          });
        }
        return item;
      }),
    };
  };
  editCustomer = async (body: ICustomerEditReq) => {
    return rootApiConnector.put(
      this.ENDPOINT.EDIT,
      body
    );
  };
  deleteAddress = async (customer_code: string, addressIds: number[]) => {
    return rootApiConnector.delete(
      this.ENDPOINT.DELETE_ADDRESS(customer_code),
      {
        data: { customer_address_ids: addressIds },
      }
    );
  };
}
export const customerApi = new CustomerApi();
