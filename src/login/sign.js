import './login_sign.css';


function SignLogo () {
  return (

    <div className='back_color'>
      
      <div>
        <input className='back_circle' id='circle_one'></input>
        <input className='back_circle' id='circle_two'></input>
        <input className='back_circle' id='circle_three' ></input>
      </div>
      
      <div className="main_logo">
        <div id='f_r'><sapn className="main_logo_p">S</sapn>ound</div>
        <div id='s_r'><span className="main_logo_p">S</span>pace</div>
      </div>

      <div>
        <div className='signtext'>SIGN IN</div>
        <input className='Enter_info' type='text'></input>
        <input className='Enter_info' type='text'></input>
        <button className="login_button"> CHECK </button>
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
