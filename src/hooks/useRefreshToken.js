// import axios from "../api/axios";
// import useAuth from "./useAuth";

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();

//   const refresh = async () => {
//     const response = await axios.get("/refresh", {
//       withCredentials: true,
//     });
//     setAuth((prev) => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.accessToken);
//       return { ...prev, accessToken: response.data.accessToken };
//     });
//     return response.data.accessToken;
//   };
//   return refresh;
// };

// export default useRefreshToken;
import axios from "../api/axios";

const REISSUE_TOKEN_URL = "api/v1/users/reissue";

// ...

const handleTokenRefresh = () => {
  // localstage에서 refreshT를 가져옴
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(refreshToken);

  // Make a request to the server to reissue the access token
  axios
    .post(REISSUE_TOKEN_URL, { refreshToken })
    .then((response) => {
      const { accessToken } = response.data.data.accessToken;

      // Update the access token in local storage or state
      localStorage.setItem("accessToken", accessToken);
      console.log("accessToekn전");
      console.log(accessToken);

      // Continue with the API request using the new access token
      // ...
    })
    .catch((error) => {
      console.log(error);
      // Handle the error, such as redirecting to the login page
    });
};

export default handleTokenRefresh;
