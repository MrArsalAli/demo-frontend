const devURL = "http://localhost:4000";
const prodURL = "";

export const BASE_URL = devURL;

export const AppRoutes = {
  signup: BASE_URL + "/user/signup",
  login: BASE_URL + "/user/signin",
};