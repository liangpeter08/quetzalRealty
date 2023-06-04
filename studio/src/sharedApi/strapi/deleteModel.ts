import axios from "axios";
import strapiClient from "./strapiClient";

export const deleteModel = async (id: string) => {
    const { data } = await strapiClient
        .delete(`/models/${id}`)
    return data;
}