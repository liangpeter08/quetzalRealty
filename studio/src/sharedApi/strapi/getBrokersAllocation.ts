import { SortingState } from "@tanstack/react-table";
import { ApiBrokerBroker } from "../../utils/schemas";
import strapiClient, { StrapiMetadata } from "./strapiClient";

export interface GetBrokersAllocation {
  sort?: SortingState
  pagination?: {
    page: number
    pageSize: number
  },
  filters?: any,
}

export type BrokerType = { id: string, attributes: ApiBrokerBroker['attributes'] }

export async function getBrokersAllocation({ sort, pagination, filters }: GetBrokersAllocation = {}): Promise<{ data: BrokerType[], meta: StrapiMetadata }> {
  const { data } = await strapiClient
    .get("/broker-allocation", {
      params: {
        populate: '*',
        sort: Object.assign({}, sort?.map((item) => item.id + (item.desc ? ':desc' : ':asc'))),
        pagination,
        filters,
      }
    })
  return { data: data?.results, meta: { pagination: data.pagination } };
}