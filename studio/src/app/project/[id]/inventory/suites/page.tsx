import React from "react";

import { getInventory } from "../../../../../sharedApi/strapi/getInventory";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@/utils/getQueryClient";
import SuitesMain from "./SuitesMain";

export default async function Project() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["suites", 0, 5], () => getInventory({ pagination: { page: 0, pageSize: 5 } }));
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}><SuitesMain /></Hydrate>;
}


