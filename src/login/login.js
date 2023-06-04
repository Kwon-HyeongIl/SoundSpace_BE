import "./login_sign.css";
import { Link, useNavigate } from "react-router-dom";
import { React, useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "api/v1/users/login";

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
        console.log(response.data);

        if (response.data.state === 200) {
          // alert(response.data.message);
          console.log(username, password);
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          // setAuth({ username, password, accessToken });
          navigate("/gallery");
        } else {
          alert(response.data.message);
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
                  // type="password"
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
