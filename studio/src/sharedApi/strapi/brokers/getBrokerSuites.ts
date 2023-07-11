import { SortingState } from "@tanstack/react-table";
import { ApiBrokerBroker, ApiSuiteSuite } from "../../../utils/schemas";
import strapiClient, { StrapiMetadata } from "../strapiClient";

export interface GetBrokersSuites {
  brokerId: string
}

type Suite = ApiSuiteSuite['attributes'] & { id: string }
export type BrokerType = { id: string, allocations: Suite[] } & ApiBrokerBroker['attributes'];

export const BROKER_SUITES_KEY = 'brokerSuites';

export async function getBrokerSuites({ brokerId }: GetBrokersSuites): Promise<BrokerType> {
  const { data } = await strapiClient
    .get("/broker-suites", {
      params: {
        brokerId
      }
    })
  return { data: data?.results, meta: { pagination: data.pagination } };
}