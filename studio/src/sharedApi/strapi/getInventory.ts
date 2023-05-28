import { ApiModelModel } from "@/utils/schemas";
import strapiClient from "./strapiClient";

export async function getInventory(): Promise<ApiModelModel[]> {
  const { data } = await strapiClient
    .get("/models", {
      params: {
        populate: '*'
      }
    })
  return data?.data;
}