import React from "react";
import "./SongListItem.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faShareSquare } from "@fortawesome/free-solid-svg-icons";

const SongListItem = ({ songData, imageURL, onSelect }) => (
  <li className="SongListItem">
    <img
      alt={`${songData.attributes.name} art`}
      src={imageURL}
      onClick={() => onSelect(songData)}
    />
    <span onClick={() => onSelect(songData)}>
      {songData.attributes.name} - {songData.attributes.artistName}
    </span>
    <FontAwesomeIcon icon={faPlayCircle} onClick={() => onSelect(songData)} />
    <CopyToClipboard text={songData.attributes.url}>
      <FontAwesomeIcon icon={faShareSquare} />
    </CopyToClipboard>
  </li>
);

export default SongListItem;
