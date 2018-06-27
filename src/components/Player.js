import React from "react";
import { observer, inject } from "mobx-react";

const Player = inject("playerStore")(
  observer(({ playerStore }) => (
    <div>
      <button
        onClick={playerStore.playing ? playerStore.stop : playerStore.play}
      >
        {playerStore.playing ? `Stop` : `Play`}
      </button>
    </div>
  ))
);

export default Player;
