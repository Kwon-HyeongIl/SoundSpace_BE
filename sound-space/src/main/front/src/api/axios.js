import axios from "axios";
// import { refresh, refreshErrorHandle } from "../context/refresh";

export default axios.create({
  baseURL: "http://localhost:3000/",
});

// const Api =  axios.create({
//   baseURL: "http://localhost:3000",
//   params: {},
// });

// axios.interceptors.request.use(refresh, refreshErrorHandle);

// export default Api

// 유저정보 api 호출
// import axios from "../api/axios";
// const getInfo = async (username:String, passward:string) => {
//   const {data} = await axios.get("/auth/getInfo");

//   return data;
// }
