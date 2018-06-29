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
      <button>+</button>
      <button>-</button>
    </div>
  ))
);

export default Player;
