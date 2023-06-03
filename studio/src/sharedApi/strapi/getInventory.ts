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

export async function getInventory(): Promise<{ data: ApiModelModel[], meta: StrapiMetadata }> {
  const { data } = await strapiClient
    .get("/models", {
      params: {
        populate: '*'
      }
    })
  return data;
}