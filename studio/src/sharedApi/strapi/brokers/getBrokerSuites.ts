import { SortingState } from "@tanstack/react-table";
import { ApiBrokerBroker, ApiSuiteSuite } from "@/utils/contentTypes";
import strapiClient, { StrapiMetadata } from "../strapiClient";

export interface GetBrokersSuites {
  brokerId: string
}

export type Suite = ApiSuiteSuite['attributes'] & { id: string }
export type BrokerType = { id: string, allocations: Suite[] } & ApiBrokerBroker['attributes'];

export const BROKER_SUITES_KEY = 'brokerSuites';

export async function getBrokerSuites({ brokerId }: GetBrokersSuites): Promise<{ data?: BrokerType }> {
  if (!brokerId) {
    return { data: undefined };
  }
  const { data } = await strapiClient
    .get("/broker-suites", {
      params: {
        brokerId
      }
    })
  return { data };
}