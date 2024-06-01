import axios from "axios";

const httpTestClient = axios.create({
  baseURL: "https://webhook.site/be750a82-7302-4159-be06-b6325ffaf453",
});

export default httpTestClient;
