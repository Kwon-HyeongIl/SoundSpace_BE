import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./user_info.css";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

function UserInfo() {
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const { auth } = useContext(AuthContext);
  // const { userName } = auth;
  // const username = "";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // 실제 액세스 토큰으로 대체해야 함

        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.state === 200) {
          console.log(response.data.message);
          console.log(response.data.data);
          const { username } = response.data.data;
          const { email } = response.data.data;
          setUsername(username);
          setEmail(email);
          console.log(username);
          console.log(email);
        } else {
          // 처리할 오류에 대한 코드
        }
      } catch (error) {
        //CORS 오류로 여기로 넘어감 ..
        if (error.response.status === 403) {
          // 서버로부터의 응답을 받은 경우
          console.log("sfesl");
          const formData = new FormData();
          formData.append("accessToken", localStorage.getItem("accessToken"));
          formData.append("refreshToken", localStorage.getItem("refreshToken"));
          try {
            const response = await axios.post(
              "http://localhost:3000/api/v1/users/reissue",
              formData
            );
            console.log("Token reissued.");
            localStorage.setItem("accessToken", response.data.data.accessToken);

            // 토큰을 재발급 받은 후에 다시 fetchData를 호출하여 API를 실행
            await fetchData();
          } catch (error) {
            if (error.response.status === 403) {
              console.log("Token reissue failed.");
            }
          }
        }
      }
    };

    fetchData();
  }, []);

  // const userList = [
  //   { id: "WAP", nowPW: "wap1234!" },
  //   { id: "PKNU_WAP", nowPW: "pknuwap1234!" },
  //   { id: "Hongju", nowPW: "hongju123*" },
  // ];

  const handleNowPasswordChange = (event) => {
    setNowPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChange = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch(
        "http://localhost:3000/api/v1/users/me/update",
        {
          newPassword: newPassword,
          oldPassword: nowPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.state === 200) {
        // 변경 성공 처리
        console.log(response.data.message);
        // 추가적인 액션 수행 가능
      } else {
        // 변경 실패 처리
        console.log(response.data.message);
        // 추가적인 오류 처리 수행 가능
      }
    } catch (error) {
      // 오류 처리
    }
  };

  return (
    <div className="back_info">
      <div className="all_element">
        <div className="now_info">
          <div className="cir_back"></div>
          <div className="info_back">
            <div className="user_img"></div>
            {/* <div className="now_id">PKNU_WAP</div> */}
            <div className="now_id">{username}</div>
            {/* <div className="info">HONG GIL DONG</div> */}
            <div className="info">{email}</div>
            <div className="heart"></div>
            {/* <div className="heart">1004</div> */}
          </div>
        </div>

        <div className="change_info">
          <div className="title_word">
            <span id="y_word">CHANGE</span> MY INFO
          </div>
          <input
            className="Enter_info"
            type="password"
            name="input_now_pw"
            placeholder="NOW PASSWORD"
            value={nowPassword}
            onChange={handleNowPasswordChange}
          ></input>
          <input
            className="Enter_info"
            type="password"
            name="input_new_pw"
            placeholder="NEW PASSWORD"
            value={newPassword}
            onChange={handleNewPasswordChange}
          ></input>
          <div className="password_values">
            <div>Now Password: {nowPassword}</div>
            <div>New Password: {newPassword}</div>
          </div>
          <button className="change_button" onClick={handleChange}>
            CHANGE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserInformation() {
  return (
    <div>
      <NavBar />
      <UserInfo />
    </div>
  );
}
