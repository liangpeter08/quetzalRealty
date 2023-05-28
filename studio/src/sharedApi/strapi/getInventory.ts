import strapiClient from "./strapiClient";

export async function getInventory() {
    const {data} = await strapiClient
    .get("/models", {
      params: {
        populate: '*'
      }
    })
    return data?.data;
  }