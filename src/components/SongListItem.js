import React from "react";

const SongListItem = ({ songData, onSelect }) => (
  <li key={songData.id} onClick={() => onSelect(songData)}>
    <img
      alt={`${songData.attributes.name} art`}
      src={songData.attributes.artwork.url
        .replace("{w}", "35")
        .replace("{h}", "35")}
    />
    {songData.attributes.name} - {songData.attributes.artistName}
  </li>
);

export default SongListItem;
