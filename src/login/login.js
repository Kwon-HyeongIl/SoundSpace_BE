import './login_sign.css';
import { Link } from 'react-router-dom';

function CenterLogo() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [passwordChk, setPasswordChk] = React.useState("");

  //email& 비밀번호 정규식
  const idRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const idCheck = (username) => {
    return idRegEx.test(username); //형식에 맞을 경우, true 리턴
  };
  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 콘솔 출력
      console.log("비밀번호 형식을 확인해주세요");
      return;
    } else {
      // 맞을 경우 출력
      console.log("비밀번호 형식이 맞아요");
    }
  };
  // const passwordDoubleCheck = (password, passwordChk) => {
  //   if (password !== passwordChk) {
  //     console.log("비밀번호가 다릅니다.");
  //     return;
  //   } else {
  //     console.log("비밀번호가 동일합니다");
  //   }
  // };
  return (
    <div className="back_color">
      <div>
        <div className="back_circle" id="circle_one"></div>
        <div className="back_circle" id="circle_two"></div>
        <div className="back_circle" id="circle_three"></div>
        <div className="back_circle" id="circle_four"></div>
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

      <div className="main_logo">
        <div id="f_r">
          <sapn className="main_logo_p">S</sapn>ound
        </div>
        <div id="s_r">
          <span className="main_logo_p">S</span>pace
        </div>
      </div>

      <div>
        <input
          onClicked={(e) => {
            setUsername(e.target.value);
            idCheck(e.target.value);
          }}
          className="Enter_info"
          type="text"
          name="user_input_id"
          placeholder="TYPING YOUR ID..."
        ></input>
        <input
          onClicked={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value);
          }}
          className="Enter_info"
          type="password"
          name="user_input_password"
          placeholder="TYPING YOUR PASSWORD..."
        ></input>
        <div>
          <Link to={"./gallery"} className='no_line'>
            <button className="login_button">
              LOGIN  
            </button>
          </Link>
          <Link to={"./sign"} className='no_line'>
            <button className="login_to_sign">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="login">
      <CenterLogo></CenterLogo>
    </div>
  );
}
