import { React} from "react";
import "./edit.css";
import NavBar from "../gallery/topNaviBar.js";

function Ranking() {
  return (
    <div className="Background_edit">
      <div className="Frame">
        <div className="Grid">

          <div className="edit_head">
            <div className="edit_head"id="numbering_head">NO</div>
            <div className="edit_head">MUSIC</div>
            <div className="edit_head">ARTIST</div>
            <div className="edit_head">REMOVE</div>
          </div>

          {Array.from({ length: 10 }, (_, i) => (
            <div>
              <hr className="edit-hr" />
              <div className="edit_content" key={i}>
                <span className="editItem" id="numbering">{i + 1}</span>
                <span className="editItem">Ditto</span>
                <span className="editItem">NewJeans</span>
                <botton className="remove_mucis"> - </botton>
              </div>
            </div>
          ))}
          <div className="add_music">
            EDIT PLAYLIST
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Ranking></Ranking>
    </div>
  );
}