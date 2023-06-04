import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user_info.css';
import NavBar from "../gallery/topNaviBar.js";

function UserInfo() {
  const [nowPassword, setNowPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const userList = [
    { id: "WAP", nowPW: "wap1234!" },
    { id: "PKNU_WAP", nowPW: "pknuwap1234!" },
    { id: "Hongju", nowPW: "hongju123*" },
  ];


  const handleNowPasswordChange = (event) => {
    setNowPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  return (
    <div className='back_info'>
      <div className='all_element'>
        <div className='now_info'>
          <div className='cir_back'></div>
          <div className='info_back'>
            <div className='user_img'></div>
            <div className='now_id'>
              PKNU_WAP
            </div>
            <div className='info'>
              HONG GIL DONG
            </div>
            <div className='info'>
              wap1248@pukyong.ac.kr
            </div>
            <div className='heart'>
              1004
            </div>
          </div>
        </div>

        <div className='change_info'>
          <div className='title_word'><span id="y_word">CHANGE</span> MY INFO</div>
          <input
            className='Enter_info'
            type='password'
            name='input_now_pw'
            placeholder='NOW PASSWORD'
            value={nowPassword}
            onChange={handleNowPasswordChange}
          ></input>
          <input
            className='Enter_info'
            type='password'
            name='input_new_pw'
            placeholder='NEW PASSWORD'
            value={newPassword}
            onChange={handleNewPasswordChange}
          ></input>
          <div className="password_values">
            <div>Now Password: {nowPassword}</div>
            <div>New Password: {newPassword}</div>
          </div>
          <button className="change_button">CHANGE</button>
        </div>
      </div>
    </div>
  );
}

export default function UserInformation() {
  return (
    <div>
      <NavBar></NavBar>
      <UserInfo></UserInfo>
    </div>
  );
}
