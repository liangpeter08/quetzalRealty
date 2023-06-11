import axios from "axios";
import strapiClient from "./strapiClient";
import { PluginUploadFile } from "@/utils/schemas";

export const uploadCSV = async (file: Blob): Promise<any> => {
    const form = new FormData()
    form.append('file', file)
    const { data } = await strapiClient
        .postForm("/suites-import", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    return data?.[0];
}