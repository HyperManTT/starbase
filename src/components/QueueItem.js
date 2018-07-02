import React from "react";
import { inject, observer } from "mobx-react";
import "./SongListItem.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faShareSquare } from "@fortawesome/free-solid-svg-icons";

const QueueItem = ({ playerStore, mediaItem, disabled }) => (
  <li className="ListItem">
    <img
      alt={`${mediaItem.attributes.name} art`}
      src={window.MusicKit.formatArtworkURL(mediaItem.attributes.artwork, 32)}
    />
    <span>
      {mediaItem.attributes.name} - {mediaItem.attributes.artistName}
    </span>
    {disabled === false ? (
      <FontAwesomeIcon
        icon={faMinus}
        onClick={() => playerStore.remove(mediaItem)}
      />
    ) : null}
    <CopyToClipboard text={mediaItem.attributes.url}>
      <FontAwesomeIcon icon={faShareSquare} />
    </CopyToClipboard>
  </li>
);

export default inject("playerStore")(observer(QueueItem));
