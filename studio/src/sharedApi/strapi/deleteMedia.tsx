import axios from "axios";
import strapiClient from "./strapiClient";
import { PluginUploadFile } from "@/utils/schemas";

export const deleteMedia = async (id: string): Promise<any> => {
    const { data } = await strapiClient
        .delete(`/upload/files/${id}`)
    return data;
}