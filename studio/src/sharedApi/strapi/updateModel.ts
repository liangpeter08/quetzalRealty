import axios from "axios";
import strapiClient from "./strapiClient";
import { ApiModelModel } from "@/utils/schemas";


export type AdditionalSpace = 'Study' | 'Flex' | 'Den'

export interface UpdateModelProps {
    project?: any
    beds?: number
    baths?: number
    interior_sf?: number
    exterior_sf?: number;
    floorplan_name?: string;
    type?: string;
    additional_space?: AdditionalSpace;
    marketing_floorplan?: number;
    legal_floorplan?: number;
    suites?: any
}

export const updateModel = async (saveModal: UpdateModelProps, id: string) => {
    const { data } = await strapiClient
        .put("/models/" + id, {
            data: saveModal
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return data?.[0];
}