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
      <button
        onClick={() =>
          playerStore.setVolume(playerStore.data.audioNode.volume + 0.1)
        }
      >
        +
      </button>
      <button
        onClick={() =>
          playerStore.setVolume(playerStore.data.audioNode.volume - 0.1)
        }
      >
        -
      </button>
    </div>
  ))
);

export default Player;
