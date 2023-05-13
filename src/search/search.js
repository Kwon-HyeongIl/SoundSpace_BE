import "./search.css"

function UserSearch(){
    
    return(
        <div className='search_back_color'>
            <div className="search_random">
                <div className="search_box">
                    <input className="Searching" type="text" name ="searching" placeholder="Search for User_Name"></input>
                    <button className="find_user"></button>
                </div>
                    <button className="random_dice"></button>
            </div>

            <div className="search_result">
                <div className="word">Searching Result !</div>      
                <div className="user_UI"></div>
                <div className="user_ID">PKNU_WAP</div>
                <div id="like">1004</div>
            </div>
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