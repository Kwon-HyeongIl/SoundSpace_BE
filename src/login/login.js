import './login_sign.css';

function CenterLogo () {
  return (

    <div className='back_color'>
      
      <div>
        <div className='back_circle' id='circle_one'></div>
        <div className='back_circle' id='circle_two'></div>
        <div className='back_circle' id='circle_three'></div>
        <div className='back_circle' id='circle_four'></div>
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
        <input className='Enter_info' type='text' name='user_input_id' placeholder='TYPING YOUR ID...'></input>
        <input className='Enter_info' type='password' name='user_input_password' placeholder='TYPING YOUR PASSWORD...'></input>
        <div>
          <button className="login_button">
            LOGIN  
          </button>
          <button className="login_to_sign">
            SIGN IN
          </button>
          
        </div>
      </div>
    </div>

  );
}


export default function Login(){
  return (
    <div className="login">
      <CenterLogo></CenterLogo>
    </div>
  )
}
