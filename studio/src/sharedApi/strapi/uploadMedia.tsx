import axios from "axios";
import strapiClient from "./strapiClient";

export const postUpload = async (file: Blob) => {
    const {data} = await strapiClient
    .postForm("/members/1", {
      body: {
        files: file
      }
    })
    return data;
}