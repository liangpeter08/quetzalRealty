import { SortingState } from "@tanstack/react-table";
import { ApiBrokerBroker } from "../../utils/schemas";
import strapiClient, { StrapiMetadata } from "./strapiClient";

export interface GetBrokers {
  sort?: SortingState
  pagination?: {
    page: number
    pageSize: number
  },
  filters?: any,
}

export type BrokerType = { id: string, attributes: ApiBrokerBroker['attributes'] };

export const BROKERS_KEY = 'brokers';

export async function getBrokers({ sort, pagination, filters }: GetBrokers = {}): Promise<{ data: BrokerType[], meta: StrapiMetadata }> {
  const { data } = await strapiClient
    .get("/brokers", {
      params: {
        populate: '*',
        sort: Object.assign({}, sort?.map((item) => item.id + (item.desc ? ':desc' : ':asc'))),
        pagination,
        filters,
      }
    })
  return data;
}