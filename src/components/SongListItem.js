import React from "react";
import { inject, observer } from "mobx-react";
import "./SongListItem.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faShareSquare,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const SongListItem = ({ playerStore, mediaItem }) => (
  <li className="ListItem">
    <img
      alt={`${mediaItem.attributes.name} art`}
      src={window.MusicKit.formatArtworkURL(mediaItem.attributes.artwork, 32)}
      onClick={() => playerStore.play(mediaItem)}
    />
    <span onClick={() => playerStore.play(mediaItem)}>
      {mediaItem.attributes.name} - {mediaItem.attributes.artistName}
    </span>
    <FontAwesomeIcon
      icon={faPlayCircle}
      onClick={() => playerStore.play(mediaItem)}
    />
    <FontAwesomeIcon
      icon={faPlus}
      onClick={() => {
        console.log(playerStore.add);
        playerStore.add(mediaItem);
      }}
    />
    {/* <CopyToClipboard text={mediaItem.attributes.url}>
      <FontAwesomeIcon icon={faShareSquare} />
    </CopyToClipboard> */}
  </li>
);

export default inject("playerStore")(observer(SongListItem));
