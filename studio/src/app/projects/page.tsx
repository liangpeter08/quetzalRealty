import Projects from "./Projects";
import { getProjects } from "../../sharedApi/strapi/getProjects";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@/utils/getQueryClient";

export default async function InitialData() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["initial-users"], getProjects);
  const dehydratedState = dehydrate(queryClient);
return <Hydrate state={dehydratedState}><Projects /></Hydrate>;
}
