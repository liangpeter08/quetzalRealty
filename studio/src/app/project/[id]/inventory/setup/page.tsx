import React from "react";

import ProjectMain from "./SetupMain";
import { getInventory } from "../../../../../sharedApi/strapi/getInventory";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@/utils/getQueryClient";

export default async function Project() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["inventory"], () => getInventory());
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}><ProjectMain /></Hydrate>;
}


