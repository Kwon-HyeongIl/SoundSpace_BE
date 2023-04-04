import React from "react";
import "../css/sidebar.css";
import { Link, useLocation } from "react-router-dom";

import SidebarItem from "./sidebarItem";

export default function Sidebar() {
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

  const menus = [
    { name: "대시보드", path: "/" },
    { name: "회원 관리", path: "/members" },
    { name: "캐시 관리", path: "/cashes" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem
              menu={menu}
              isActive={pathName === menu.path ? true : false} // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
            />
          </Link>
        );
      })}
    </div>
  );
}

//후에 다른 페이지와 합치면 sidebarItem.js에 밑에 코드 넣기
// import React from "react";

// function SidebarItem({ menu }) {
//   return (
//     <div className="sidebar-item">
//       <p>{menu.name}</p>
//     </div>
//   );
// }

// export default SidebarItem;
