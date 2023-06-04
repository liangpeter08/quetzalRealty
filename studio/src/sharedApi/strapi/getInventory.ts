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
  start?: number
  fetchSize?: number
  sorting?: SortingState
}

export type ModelType = { id: string, attributes: ApiModelModel['attributes'] }

export async function getInventory(props: GetInventoryProps = {}): Promise<{ data: ModelType[], meta: StrapiMetadata }> {
  const { data } = await strapiClient
    .get("/models", {
      params: {
        populate: '*'
      }
    })
  return data;
}