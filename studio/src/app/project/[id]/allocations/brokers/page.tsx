import React from "react";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@/utils/getQueryClient";
import SuitesMain from "./BrokersMain";
import { getBrokersAllocation } from "@/sharedApi/strapi/getBrokersAllocation";

export default async function Project() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["brokerAllocation", 0, 5], () => getBrokersAllocation({ pagination: { page: 0, pageSize: 5 } }));
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}><SuitesMain /></Hydrate>;
}


