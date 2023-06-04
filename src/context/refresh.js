// import axios from "axios";
// import Cookie from "js-cookie";
// import moment from "moment";

// const refresh = async (config) => {
//   const refreshToken = localStorage.get("refreshToken");
//   const expireAt = localStorage.getItem("expiresAt");
//   let token = localStorage.getItem("accessToken");

//   // If the token has expired and refreshToken is available
//   if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
//     const body = {
//       refreshToken,
//     };

//     // Token refresh server communication
//     const { data } = await axios.post(`${server}/auth/token`, body);

//     token = data.data.accessToken;
//     localStorage.setItem("accessToken", data.data.accessToken);
//     localStorage.setItem(
//       "expiresAt",
//       moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss")
//     );
//   }

//   config.headers["Authorization"] = `Bearer ${token}`;

//   return config;
// };

// const refreshErrorHandle = (err) => {
//   Cookie.remove("refreshToken");
// };

// export { refresh, refreshErrorHandle };
