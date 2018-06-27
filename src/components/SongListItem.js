import React from "react";
import "./SongListItem.css";

const SongListItem = ({ songData, onSelect }) => (
  <li className="SongListItem" onClick={() => onSelect(songData)}>
    <img
      alt={`${songData.attributes.name} art`}
      src={songData.attributes.artwork.url
        .replace("{w}", "35")
        .replace("{h}", "35")}
    />
    <span>
      {songData.attributes.name} - {songData.attributes.artistName}
    </span>
  </li>
);

export default SongListItem;
