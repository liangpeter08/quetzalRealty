import axios from "axios";
import strapiClient from "./strapiClient";
import { PluginUploadFile } from "@/utils/schemas";

export const uploadMedia = async (file: Blob): Promise<any> => {
  const form = new FormData()
  form.append('files', file)
  const { data } = await strapiClient
    .postForm("/upload", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  return data?.[0];
}