import axios from "axios";
import strapiClient from "./strapiClient";

export const uploadMedia = async (file: Blob) => {
  const form = new FormData()
  form.append('files', file)
  const { data } = await strapiClient
    .postForm("/upload", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  return data;
}