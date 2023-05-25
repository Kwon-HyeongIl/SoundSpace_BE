import './user_info.css';

function UserInfo () {
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

            </div>

        </div>
    </div>

  );
}


export default function UserInformation(){
  return (
    <div>
      <UserInfo></UserInfo>
    </div>
  )
}