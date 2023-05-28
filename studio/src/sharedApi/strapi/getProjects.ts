import strapiClient from "./strapiClient";

export async function getProjects() {
    const {data} = await strapiClient
    .get("/members/1", {
      params: {
        populate: '*'
      }
    })
    return data?.data?.attributes?.projects?.data;
  }