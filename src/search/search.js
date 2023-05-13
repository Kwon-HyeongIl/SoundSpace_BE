import "./search.css"
import React, {useState} from "react";

function UserSearch(){

    const [showResult, setShowResult] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState(["PKNU_WAP","Hongju","WAP"]);

    function findButtonClick() {
        setShowResult(list.includes(userInput));
    }

    function findInputChange(event) {
        setUserInput(event.target.value);   
    }
    
    return(
        <div className='search_back_color'>

            <div className="search_random">
                <div className="search_box">
                    <input className="Searching" type="text" name ="searching" placeholder="Search for User_Name" value={userInput} onChange={findInputChange}></input>
                    <button className="find_user" onClick={findButtonClick}></button>
                </div>
                    <button className="random_dice"></button>
            </div>

            {showResult &&
                <div className="word">Searching Result !</div>
            }
            {showResult &&
                <div className="search_result">
                    <div className="user_UI"></div>
                    <div className="user_ID">PKNU_WAP</div>
                    <div id="like">1004</div>
                </div>
            };
        </div>
    );
}

export default function Searching(){
    return (
      <div>
        <UserSearch></UserSearch>
      </div>
    )
  }