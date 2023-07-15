import axios from "axios";
import strapiClient from "../strapiClient";

export interface DeAllocationsProps {
  suiteId: number
  allocationId: number
}

export const deAllocation = async (req: DeAllocationsProps) => {
  const { data } = await strapiClient
    .post("/delete-allocation", req, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  return data;
}