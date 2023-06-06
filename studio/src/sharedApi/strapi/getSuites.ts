import { SortingState } from "@tanstack/react-table";
import { ApiSuiteSuite } from "../../utils/schemas";
import strapiClient from "./strapiClient";

export interface StrapiMetadata {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number,
    }
}

export interface GetSuiteProps {
    sort?: SortingState
    pagination?: {
        page: number
        pageSize: number
    },
    filters?: any,
}

export type SuiteData = { id: string, attributes: ApiSuiteSuite['attributes'] }

export async function getSuites({ sort, pagination, filters }: GetSuiteProps = {}): Promise<{ data: SuiteData[], meta: StrapiMetadata }> {
    const { data } = await strapiClient
        .get("/suites", {
            params: {
                populate: '*',
                sort: Object.assign({}, sort?.map((item) => item.id + (item.desc ? ':desc' : ':asc'))),
                pagination,
                filters
            }
        })
    return data;
}