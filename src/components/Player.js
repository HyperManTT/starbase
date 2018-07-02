import React from "react";
import { observer, inject } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward
} from "@fortawesome/free-solid-svg-icons";

import "./Player.css";

const PlayerTime = inject("playerStore")(
  observer(({ playerStore }) => <div>{playerStore.timeString}</div>)
);

const Player = ({ playerStore }) => (
  <div>
    <PlayerTime />
    {playerStore.currentMediaItem !== null ? (
      <div>{playerStore.currentMediaItem.attributes.name}</div>
    ) : (
      <div>No Selection</div>
    )}
    <FontAwesomeIcon
      icon={playerStore.isPlaying ? faPause : faPlay}
      onClick={() =>
        playerStore.isPlaying ? playerStore.pause() : playerStore.play()
      }
    />
    <FontAwesomeIcon icon={faForward} onClick={playerStore.next} />
    <input
      type="range"
      id="volume"
      min="0"
      value={
        playerStore.data.audioNode !== null
          ? playerStore.data.audioNode.volume
          : 1
      }
      max="1.0"
      step="0.01"
      onChange={event => playerStore.setVolume(event.target.value)}
    />
  </div>
);

export default inject("playerStore")(observer(Player));
