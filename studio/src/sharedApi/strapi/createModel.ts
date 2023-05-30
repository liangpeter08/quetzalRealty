import axios from "axios";
import strapiClient from "./strapiClient";
import { ApiModelModel } from "@/utils/schemas";


export type AdditionalSpace = 'Study' | 'Flex' | 'Den'

export interface CreateModelProps {
    project: any
    beds: number
    baths: number
    interior_sf: number
    exterior_sf: number;
    floorplan_name: string;
    type: string;
    additional_space?: AdditionalSpace;
    marketing_floorplan?: number;
    legal_floorplan?: number;
    suites?: any
}

export const createModel = async (saveModal: CreateModelProps) => {
    const { data } = await strapiClient
        .post("/models", {
            data: saveModal
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return data?.[0];
}