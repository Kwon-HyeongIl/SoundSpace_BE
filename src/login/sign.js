import './login_sign.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignLogo () {

  const [click, setClick] = useState(false);

  const Clicked = () => {
    setClick(true);
  }

  return (

    <div className='back_color'>
      
      <div>
        <div className='back_circle' id='circle_four'></div>
        <div className='back_circle' id='circle_two'></div>
        <div className='back_circle' id='circle_one'></div>
        <div className='back_circle' id='circle_three'></div>
        <div className='back_circle' id='circle_five'></div>

        <div>
          <div className='note_head' id='note_1'></div>
          <div className='note_tail' id='tail_1'></div>
          <div className='note_tail' id='tail_2'></div>
          <div className='note_tail' id='tail_3'></div>
          <div className='note_tail' id='tail_4'></div>
          <div className='note_tail' id='tail_5'></div>
        </div>

        <div>
          <div className='note_head' id='note_2'></div>
          <div className='note_tail' id='tail_6'></div>
        </div>
      </div>

      <div className="main_logo">
        <div id='f_r'>
          <sapn className="main_logo_p">S</sapn>ound
        </div>
        <div id='s_r'>
          <span className="main_logo_p">S</span>pace
        </div>
      </div>

      <div>
        <div className='signtext'>SIGN IN</div>
        <input className='Enter_info' type='text' placeholder='TYPING YOUR ID...'></input>
        <input className='Enter_info' type='password' placeholder='TYPING YOUR PASSWORD...'></input>
        <Link to={"/"} className='no_line'>
          <button
            className={`login_button ${click ? 'check_click' : ''}`}
            onClick={Clicked}
            id='sign_check'
          >
            CHECK </button>
        </Link>
      </div>

    </div>

  );
}


export default function Login(){
  return (
    <div className="login">
      <SignLogo></SignLogo>
    </div>
  )
}
