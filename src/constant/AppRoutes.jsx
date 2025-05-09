const devURL = "http://192.168.18.33:4000";
const prodURL = "";

export const BASE_URL = devURL;

export const AppRoutes = {
  signup: BASE_URL + "/user/signup",
  login: BASE_URL + "/user/signin",
};