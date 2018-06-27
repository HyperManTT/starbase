import { decorate, observable, computed, action } from "mobx";

class PlayerStore {
  playing = false;
  get currentTime() {
    return window.MusicKitInstance.player.currentPlaybackTime;
  }
  stop = () => {
    console.log("stop");
    this.playing = false;
    window.MusicKitInstance.stop();
  };
  play = () => {
    console.log("play");
    this.playing = true;
    window.MusicKitInstance.play();
  };
}

decorate(PlayerStore, {
  playing: observable,
  currentTime: computed,
  stop: action,
  play: action
});

export default new PlayerStore();
