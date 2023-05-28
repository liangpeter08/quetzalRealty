import axios from "axios";

export async function getInventory() {
    const {data} = await axios
    .get("http://quetzalrealty.duckdns.org:1337/api/members/1", {
      params: {
        populate: '*'
      },
      headers: {
        Authorization: 'Bearer 39287ecfab8cbe0e7a8fa9ba3d1819396d4caa95df501451ccc593c269266020f49fad041a1067a093518495df874b2ed361a16bbbff8a81f26f387d4afb2ae1bd55c15b5549e9d28c414020803ad91ed4f776d1d0db5af1aa2e000168803e2ff5b5612c4502f89c691f54b9a3e8e5de1a087c32297023f02ae024225a7df8b8'
      }
    })
    return data?.data?.attributes?.projects?.data;
  }