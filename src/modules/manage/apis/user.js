import request from "../utils/request";
export const loginApi = (params) =>
  request({ url: "/api/login", method: "get", params });
export const getMenusApi = (data) => {
  console.log(data, "data");
  return request({ url: "/api/getMenus", method: "post", data });
};
// ==============================

export const getOptionsApi = (data) => {
  return request({ url: "/api/hobby", method: "post", data });
};
