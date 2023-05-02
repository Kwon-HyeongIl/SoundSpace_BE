import './login_sign.css';


function CenterLogo () {
  return (

    <div className='back_color'>
      
      <div>
        <div className='back_circle' id='circle_one'></div>
        <div className='back_circle' id='circle_two'></div>
        <div className='back_circle' id='circle_three' ></div>
        <div className='back_circle' id='circle_four' ></div>
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
        <input className='Enter_info' type='text' placeholder='TYPING YOUR ID...'></input>
        <input className='Enter_info' type='password' placeholder='TYPING YOUR PASSWORD...'></input>
        <button className="login_button">
          LOGIN  
        </button>
      </div>

      <div className='with_back'>
        <button className="login_to_sign">
          SIGN IN
        </button>
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
