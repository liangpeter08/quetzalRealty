import { SortingState } from "@tanstack/react-table";
import { ApiModelModel } from "../../utils/schemas";
import strapiClient from "./strapiClient";

export interface StrapiMetadata {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number,
  }
}

export interface GetInventoryProps {
  sort?: SortingState
  pagination?: {
    page: number
    pageSize: number
  }
}

export type ModelType = { id: string, attributes: ApiModelModel['attributes'] }

export async function getInventory({ sort, pagination }: GetInventoryProps = {}): Promise<{ data: ModelType[], meta: StrapiMetadata }> {
  const { data } = await strapiClient
    .get("/models", {
      params: {
        populate: '*',
        sort: sort?.map((item) => item.id + (item.desc ? ':' + item.desc : '')),
        pagination
      }
    })
  return data;
}