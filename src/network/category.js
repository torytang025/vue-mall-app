import { request } from "./requests";

export function getCategory() {
  return request({
    url: "/category"
  });
}
