import axios from "axios";

export default axios.create({
  baseURL: "http://quetzalrealty.duckdns.org:1337/api",
  headers: {
    Authorization: 'Bearer 241b3598a6695c68628ca4853d939d660fed730a65d8f8ab569e3d9dfe649f4567c80c55fad2768f9f6a17bc479cee582003a903fb80b465d42f27523a77664d52d411a62b860bebf7ca6a5830142d16d89edd1dbc7a6e723bcf2c0f3d0a37021a706807c8ff61cb937d3c81a9c2a11aca3bcb8d5558885263f64a08906bc6c8'
  }
});