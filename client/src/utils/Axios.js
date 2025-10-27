import axios from "axios";
import { Endpoints } from "../common/Endpoint";

axios.interceptors.request.use(
  async (config) => {
    const Accesstoken = localStorage.getItem("accesstoken");
    if (Accesstoken) {
      config.headers.Authorization = `Bearer ${Accesstoken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//expand life span for accesstoken with help refreshtoken
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originRequest = error.config;
    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const Refreshtoken = localStorage.getItem("refreshtoken");
      if (Refreshtoken) {
        const newaccesstoken = await refreshAccessToken(Refreshtoken);
        if (newaccesstoken) {
          originRequest.headers.Authorization = `Bearer ${newaccesstoken} `;
          return axios(originRequest);
        }
        return Promise.reject(error);
      }
    }
  }
);

const refreshAccessToken = async (refreshtoken) => {
  try {
    const response = await axios.post(
      Endpoints.Refresh_token.url,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshtoken}`,
        },
      }
    );

    const accesstoken = response.data.data.newaccesstoken;
    localStorage.setItem("accesstoken", accesstoken);
    return accesstoken;
  } catch (error) {
    console.log(error);
    return error;
  }
};
