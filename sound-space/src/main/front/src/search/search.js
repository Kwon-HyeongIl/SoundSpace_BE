import "./search.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

function UserSearch() {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [userInput, setUserInput] = useState("");

  const idList = [];

  const [searchResult, setSearchResult] = useState(null);
  const [username, setUsername] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // 추가: 선택된 사용자의 ID 저장

  // function callAPI(userInput) {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   const params = new URLSearchParams();
  //   params.append("username", username);
  //   const url = `http://localhost:3000/api/v1/users/search`;

  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       params: { query: userInput },
  //     })
  //     .then((response) => {
  //       console.log("1");
  //       console.log(username);
  //       console.log(response.data);
  //       setSearchResult(response.data.data);
  //       if (searchResult && searchResult.length === 0) {
  //         alert("검색 결과가 없습니다.");
  //       }
  //     })
  //     .catch((error) => {
  //       //CORS 오류로 여기로 넘어감 ..
  //       // console.log("2");
  //       // console.error(error);
  //       if (error.response.status === 403) {
  //         // 서버로부터의 응답을 받은 경우
  //         console.log("sfesl");
  //         const formData = new FormData();
  //         formData.append("accessToken", accessToken);
  //         formData.append("refreshToken", refreshToken);
  //         axios({
  //           method: "post",
  //           url: "http://localhost:3000/api/v1/users/reissue",
  //           data: formData,
  //         })
  //           .then((response) => {
  //             console.log("12");
  //             console.log(response.data);
  //           })
  //           .catch((error) => {
  //             if (error.response.status === 403) {
  //               console.log("Token reissue failed.");
  //             }
  //           });
  //       }
  //     });
  // }

  function findButtonClick() {
    const index = idList.findIndex((item) => item.id === userInput);
    if (index !== -1) {
      setSearchResult([{ id: userInput, username: userInput }]);
      setShowResult(true);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const params = new URLSearchParams();
      params.append("username", username);
      const url = `http://localhost:3000/api/v1/users/search`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { query: userInput },
        })
        .then((response) => {
          console.log("1");
          console.log(username);
          console.log(response.data);
          setSearchResult(response.data.data);
          setShowResult(true);
          if (response.data.data.length === 0) {
            alert("검색 결과가 없습니다.");
          }
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
    }
  }

  function randomButtonClick() {
    if (idList.length > 0) {
      const randomIndex = Math.floor(Math.random() * idList.length);
      setSearchResult([
        { id: idList[randomIndex].id, username: idList[randomIndex].id },
      ]);
      setUserInput(idList[randomIndex].id);
      setShowResult(true);
    }
  }

  function findInputChange(event) {
    setUserInput(event.target.value);
    setUsername(event.target.value);
    setSearchResult([]);
  }

  function handleUserClick(userId) {
    // setSelectedUserId(userId); // 선택된 사용자의 ID 설정
    navigate(`/gallery/${userId}`);
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="search_back_color">
        <div className="user_search_random">
          <div className="user_search_box">
            <input
              className="user_Searching"
              type="text"
              name="searching"
              placeholder="Search for User_Name"
              value={userInput}
              onChange={findInputChange}
            ></input>
            <button className="find_user" onClick={findButtonClick}></button>
          </div>
          <button className="random_dice" onClick={randomButtonClick}></button>
        </div>

        {showResult && searchResult.length > 0 && (
          <div className="user_result_list">
            {searchResult.map((user) => (
              <div className="user_search_result" key={user.id}>
                <div
                  className="user_result"
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="user_UI"></div>
                  <div className="user_ID">{user.username}</div>
                  <div className="s_heart"></div>
                  {/* <div className="user_like">3</div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function Searching() {
  return (
    <div>
      <UserSearch></UserSearch>
    </div>
  );
}