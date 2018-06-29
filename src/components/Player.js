import React from "react";
import { observer, inject } from "mobx-react";

const Player = inject("playerStore")(
  observer(({ playerStore }) => (
    <div>
      <div>{playerStore.timeString}</div>
      <button
        onClick={
          playerStore.data.isPlaying ? playerStore.pause : playerStore.play
        }
      >
        {playerStore.data.isPlaying ? `Pause` : `Play`}
      </button>
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
  ))
);

export default Player;
