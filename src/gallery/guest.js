import { React, useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar";
import { useNavigate, useLocation } from "react-router-dom";
import "./guest.css";
import axios from "../api/axios";

export default function GuestList() {
  const bookmark = true;
  const navigate = useNavigate;
  const location = useLocation();
  const userId = location.state && location.state.userId;
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchGuestbooks = () => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}/guestbooks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.state === 200) {
          setData(result.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchGuestbooks();
  }, []);

  const handleSubmit = () => {
    const requestData = { content: inputValue };
    axios
      .post(
        `http://localhost:3000/api/v1/users/${userId}/guestbooks`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("요청이 성공했습니다.");
        //입력값 초기화
        setInputValue("");
        fetchGuestbooks();
      })
      .catch((error) => {
        //CORS 오류로 여기로 넘어감 ..
        // console.log("2");
        // console.error(error);
        if (error.response.status === 403) {
          // 서버로부터의 응답을 받은 경우
          console.log("sfesl");
          const formData = new FormData();
          formData.append("accessToken", accessToken);
          formData.append("refreshToken", refreshToken);
          axios({
            method: "post",
            url: "http://localhost:3000/api/v1/users/reissue",
            data: formData,
          })
            .then((response) => {
              console.log("12");
              console.log(response.data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                console.log("Token reissue failed.");
              }
            });
        }
      });
  };

  //me
  // const fetchGuestbooks = () => {
  //   axios
  //     .get("http://localhost:3000/api/v1/users/me/guestbooks", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       const result = response.data;
  //       if (result.state === 200) {
  //         setData(result.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchGuestbooks();
  // }, []);

  // const handleSubmit = () => {
  //   const requestData = { content: inputValue };
  //   axios
  //     .post("http://localhost:3000/api/v1/users/me/guestbooks", requestData, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("요청이 성공했습니다.");
  //       //입력값 초기화
  //       setInputValue("");
  //       fetchGuestbooks();
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <>
      <NavBar />
      <div className="Guest_frame">
        <div className="leftBox">
          <div className="input-frame">
            <span className="user_name">방명록 작성</span>
            <input
              className="guest_input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="send_button" onClick={handleSubmit}>
              send
            </button>
          </div>
        </div>
        <div className="guest_list">
          <div>
            <div className="list-frame">
              <div className="list_content">
                <div className="list_content_child">USER</div>
                <div className="list_content_child">CONTENT</div>
              </div>
              {data.map((item) => (
                <div key={item.id}>
                  <hr className="guest_hr" />
                  <div className="guestContainer">
                    <span className="guestItem">{item.writerName}</span>
                    <span className="guestItem">{item.content}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
