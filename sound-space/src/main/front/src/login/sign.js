import "./login_sign.css";
import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function SignLogo() {
  const [click, setClick] = useState(false);

  const Clicked = () => {
    setClick(true);
  };

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    axios({
      method: "post",
      url: "http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/sign-up",
      data: formData,
    })
      .then((response) => {
        console.log("요청성공");
        console.log(response.data);

        if (response.data.state === 200) {
          // alert(response.data.message);
          console.log(username, password, email);
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          setAuth({ username, password });
          navigate("/");
        } else if (response.data.state === 400) {
          let errorMessage = "";
          response.data.error.forEach((error) => {
            errorMessage += `${error.message}\n`;
          });
          alert(response.data.message);
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
        if (error.response && error.response.status === 401) {
          // Attempt to refresh the access token
          // handleTokenRefresh();
        }
      });
  };

  return (
    <div className="back_color">
      <div>
        <div className="back_circle" id="circle_four"></div>
        <div className="back_circle" id="circle_two"></div>
        <div className="back_circle" id="circle_one"></div>
        <div className="back_circle" id="circle_three"></div>
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

      <div className="main_logo" id="sign">
        <div>
          <sapn className="main_logo_p">S</sapn>ound
          <span className="main_logo_p"> S</span>pace
        </div>
      </div>

      <div>
        <div className="signtext">SIGN UP</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            className="Enter_info"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="TYPING YOUR E-MAIL..."
          ></input>
          <label htmlFor="username"></label>
          <input
            className="Enter_info"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off" 
            onChange={(e) => setUser(e.target.value)}
            value={username}
            required
            name="user_input_id"
            placeholder="TYPING YOUR ID..."
          ></input>
          <label htmlFor="password"></label>
          <input
            className="Enter_info"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            required
            name="user_input_password"
            placeholder="TYPING YOUR PASSWORD..."
          ></input>
          {/* <Link to={"/"} className="no_line"> */}
          <button
            className={`login_button ${click ? "check_click" : ""}`}
            onClick={Clicked}
            id="sign_check"
          >
            CHECK{" "}
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="login">
      <SignLogo></SignLogo>
    </div>
  );
}
