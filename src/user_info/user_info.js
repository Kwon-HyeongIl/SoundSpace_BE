import React, { useState } from 'react';
import './user_info.css';
import NavBar from "../gallery/topNaviBar.js";

function UserInfo() {
  const [showEnterEmail, setShowEnterEmail] = useState(false);
  const [showEnterPW, setShowEnterPW] = useState(false);

  function handleFixEmailClick() {
    setShowEnterEmail(true);
    setShowEnterPW(false);
  }

  function handleFixPWClick() {
    setShowEnterPW(true);
    setShowEnterEmail(false);
  }

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
          {/*
          <span>
            <button className='fix_button' onClick={handleFixEmailClick}>E-MAIL</button>
            <button className='fix_button' onClick={handleFixPWClick}>PASSWORD</button>
          </span>
          {showEnterEmail && (
            <input className='Enter_info' type='text' name='input_new_id' placeholder='ENTER NEW E-MAIL'></input>
          )}
          
          {showEnterPW && (
            <>
            */}
              <input className='Enter_info' type='password' name='input_now_pw' placeholder='NOW PASSWORD'></input>
              <input className='Enter_info' type='password' name='input_new_pw' placeholder='NEW PASSWORD'></input>
            {/*<input className='Enter_info' type='password' name='input_check_pw' placeholder='ONE MORE PASSWORD'></input>
            </div></>
          )}*/}
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