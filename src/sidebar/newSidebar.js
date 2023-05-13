import React, { useEffect, useRef, useState } from "react";
import styles from "./newSidebar.module.css";
import "../gallery/gallery.css";

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          //이게 왜 안되는지 모르겠음 ㅇㅅㅇ
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button onClick={() => toggleMenu()} className={styles.button}>
          {isOpen ? (
            <span className="hidden"></span>
          ) : (
            // <span>X</span>
            // <img
            //   src="./heart.png"
            //   alt="heart"
            //   alr="contact open button"
            //   className={styles.openBtn}
            // />
            //이미지 버튼 대신 menu글자로 >> gallery.css
            <span className="menu">MENU</span>
          )}
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
