import axios from "axios";
import strapiClient from "./strapiClient";
import { ApiModelModel } from "@/utils/schemas";


interface CreateModelProps {
    project: any
    beds: number
    baths: number
    interior_sf: number
    exterior_sf: number;
    floorplan_name: string;
    marketing_floorplan: number;
    legal_floorplan: number;
    suites: any
}

export const createModel = async (saveModal: CreateModelProps) => {
    const { data } = await strapiClient
        .post("/models", {
            data: {
                project: { "disconnect": [], "connect": [{ "id": 1, "position": { "end": true } }] },
                suites: { "disconnect": [], "connect": [{ "id": 1, "position": { "end": true } }] },
                beds: 323,
                baths: 2,
                interior_sf: 2323,
                exterior_sf: 43434,
                floorplan_name: "adsfgasdfasdf",
                marketing_floorplan: 5,
                legal_floorplan: 1
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return data?.[0];
}