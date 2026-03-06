export interface IPageResponse<T> {
  data: T[];
  total_count: number;
  page_index: number;
  page_size: number;
}
export interface IPageRequest {
  page_index?: number;
  page_size?: number;
}

export interface IPrimaryBaseEntity {
  id: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string | null;
  updatedBy: string | null;
}
