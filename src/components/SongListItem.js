import React from "react";
import "./SongListItem.css";

const SongListItem = ({ songData, imageURL, onSelect }) => (
  <li className="SongListItem" onClick={() => onSelect(songData)}>
    <img alt={`${songData.attributes.name} art`} src={imageURL} />
    <span>
      {songData.attributes.name} - {songData.attributes.artistName}
    </span>
  </li>
);

export default SongListItem;
