import "./login_sign.css";
import { Link, useNavigate } from "react-router-dom";
import { React, useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "/api/v1/users/login";

// const loginDB = (id, password) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "post",
//       url: "/api/v1/users/login",
//       data: {
//         emial: id,
//         password: password,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         dispatch(
//           setUser({
//             email: res.data.email,
//           })
//         );
//         const accessToken = res.data.token;
//         //쿠키에 토큰 저장
//         setCookie("is_login", "${accessToken}");
//         document.location.href = "/";
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

function CenterLogo() {
  // const [id, setID] = React.useState("");
  // const [pwd, setPwd] = React.useSteate("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       LOGIN_URL,
  //       {
  //         username: username,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log(JSON.stringify(response?.data?.message));
  //     // console.log(JSON.stringify(response));
  //     const accessToken = response?.data?.accessToken;
  //     // const roles = response?.data?.roles;
  //     setAuth({ username, password, accessToken });
  //     setUser("");
  //     setPwd("");
  //     setSuccess(true);

  //     //로그인 성공 후 페이지 이동
  //     navigate("/gallery");
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Unautorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //     errRef.current.focues();
  //   }
  //   console.log(username, password);
  //   console.log("user:", username);
  //   console.log("pwd:", password);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios({
      method: "post",
      url: "http://localhost:3000/api/v1/users/login",
      data: formData,
    })
      .then((response) => {
        console.log("요청성공");
        console.log(response?.data);
        if (response.data.result === "fail") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          navigate("/gallery");
        }

        // if (response.data.message === "") {
        //   alert(JSON.stringify(response.data.error[0]));
        //   navigate("/gallery");
        // } else {
        //   alert(response.data.message);
        // }
      })
      .catch((error) => {
        console.log("요청실패");
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>hello</p>
        </section>
      ) : (
        <section>
          <div className="back_color">
            <div>
              <div className="back_circle" id="circle_one"></div>
              <div className="back_circle" id="circle_two"></div>
              <div className="back_circle" id="circle_three"></div>
              <div className="back_circle" id="circle_four"></div>
              <div className="back_circle" id="circle_five"></div>

              <div>
                <div className="note_head" id="note_1"></div>
                <div className="note_tail" id="tail_1"></div>
                <div className="note_tail" id="tail_2"></div>
                <div className="note_tail" id="tail_3"></div>
                <div className="note_tail" id="tail_4"></div>
                <div className="note_tail" id="tail_5"></div>
              </div>

              <div>
                <div className="note_head" id="note_2"></div>
                <div className="note_tail" id="tail_6"></div>
              </div>
            </div>

            <div className="main_logo">
              <div id="f_r">
                <sapn className="main_logo_p">S</sapn>ound
              </div>
              <div id="s_r">
                <span className="main_logo_p">S</span>pace
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  className="Enter_info"
                  type="text"
                  id="username"
                  ref={userRef}
                  // autoComplete="off" 자동완성 일단 주석처리
                  onChange={(e) => setUser(e.target.value)}
                  value={username}
                  required
                  // name="user_input_id"
                  placeholder="TYPING YOUR ID..."
                />
                <label htmlFor="password">Password:</label>
                <input
                  className="Enter_info"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={password}
                  required
                  // name="user_input_password"
                  placeholder="TYPING YOUR PASSWORD..."
                />

                <div>
                  {/* <Link to={"./gallery"} className="no_line"> */}
                  <button className="login_button">LOGIN</button>
                  {/* </Link> */}
                  <Link to={"./sign"} className="no_line">
                    <button className="login_to_sign">SIGN UP</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function Login() {
  return (
    <div className="login">
      <CenterLogo></CenterLogo>
    </div>
  );
}
