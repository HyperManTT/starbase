import React from "react";
import { observer, inject } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faBackward
} from "@fortawesome/free-solid-svg-icons";

import { Slider, Direction, PlayerIcon } from "react-player-controls";
import Button from "@material-ui/core/Button";
import { ProgressBar } from "./ProgressBar";

import "./Player.css";

const PlayerTime = inject("playerStore")(
  observer(({ playerStore }) => <div>{playerStore.timeString}</div>)
);

const Player = ({ playerStore }) => (
  <div className="playerDiv">
    {playerStore.currentMediaItem !== null ? (
      <div className="playerDiv">
        {playerStore.currentMediaItem.attributes.name}
      </div>
    ) : (
      <div className="playerDiv">No Selection</div>
    )}
    <ProgressBar
      isEnabled
      direction={Direction.HORIZONTAL}
      value={
        playerStore.getTimeElapsed() / playerStore.getCurrentPlaybackDuration()
      }
      onChange={value =>
        playerStore.seek(value * playerStore.getCurrentPlaybackDuration())
      } //value * currentSong.duration
    />
    <FontAwesomeIcon
      className="playBackButton"
      icon={playerStore.isPlaying ? faPause : faPlay}
      onClick={() =>
        playerStore.isPlaying ? playerStore.pause() : playerStore.play()
      }
    />
    <FontAwesomeIcon
      className="forwardButton"
      icon={faStepForward}
      onClick={playerStore.next}
    />
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
