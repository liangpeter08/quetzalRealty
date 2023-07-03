import strapiClient from "../strapiClient";


export interface CreateAllocationsProps {
    suiteId: number
    brokerId: number
}

export const createAllocation = async (req: CreateAllocationsProps) => {
    const { data } = await strapiClient
        .post("/allocations", req, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return data;
}