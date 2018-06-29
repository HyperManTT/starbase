import moment from "moment";
import { decorate, observable, computed, action, configure } from "mobx";
configure({ enforceActions: true });

const Events = {
  authorizationStatusDidChange: "authorizationStatusDidChange",
  authorizationStatusWillChange: "authorizationStatusWillChange",
  bufferedProgressDidChange: "bufferedProgressDidChange",
  eligibleForSubscribeView: "eligibleForSubscribeView",
  loaded: "musickitloaded",
  mediaCanPlay: "mediaCanPlay",
  mediaItemDidChange: "mediaItemDidChange",
  mediaItemStateDidChange: "mediaItemStateDidChange",
  mediaItemStateWillChange: "mediaItemStateWillChange",
  mediaItemWillChange: "mediaItemWillChange",
  mediaPlaybackError: "mediaPlaybackError",
  metadataDidChange: "metadataDidChange",
  playbackBitrateDidChange: "playbackBitrateDidChange",
  playbackDurationDidChange: "playbackDurationDidChange",
  playbackProgressDidChange: "playbackProgressDidChange",
  playbackStateDidChange: "playbackStateDidChange",
  playbackStateWillChange: "playbackStateWillChange",
  playbackTargetAvailableDidChange: "playbackTargetAvailableDidChange",
  playbackTimeDidChange: "playbackTimeDidChange",
  playbackVolumeDidChange: "playbackVolumeDidChange",
  primaryPlayerDidChange: "primaryPlayerDidChange",
  queueItemsDidChange: "queueItemsDidChange",
  queuePositionDidChange: "queuePositionDidChange",
  storefrontCountryCodeDidChange: "storefrontCountryCodeDidChange",
  storefrontIdentifierDidChange: "storefrontIdentifierDidChange",
  userTokenDidChange: "userTokenDidChange"
};

class PlayerStore {
  musicKit;

  data = {
    currentPlaybackDuration: 0,
    currentPlaybackTime: 0,
    currentPlaybackTimeRemaining: 0,
    currentVolume: 1,
    isPlaying: false
  };

  get timeString() {
    let pad = function(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    };
    let currentTime = moment.duration(this.data.currentPlaybackTime, "seconds");
    let remainingTime = moment.duration(
      this.data.currentPlaybackTimeRemaining,
      "seconds"
    );
    return `${currentTime.minutes()}:${pad(
      currentTime.seconds()
    )} : -${remainingTime.minutes()}:${pad(remainingTime.seconds())}`;
  }

  constructor() {
    window.addEventListener(
      "musickitloaded",
      action(() => {
        this.musicKit = window.MusicKit.getInstance();
        this.musicKit.addEventListener(
          Events.playbackStateDidChange,
          this.update
        );
        this.musicKit.addEventListener(
          Events.playbackTimeDidChange,
          this.update
        );
        this.musicKit.addEventListener(
          Events.playbackVolumeDidChange,
          this.update
        );
      })
    );
  }

  update = () => {
    this.data = {
      currentPlaybackDuration: this.musicKit.player.currentPlaybackDuration,
      currentPlaybackTime: this.musicKit.player.currentPlaybackTime,
      currentPlaybackTimeRemaining: this.musicKit.player
        .currentPlaybackTimeRemaining,
      currentPlaybackVolume: this.musicKit.player.currentPlaybackVolume,
      isPlaying: this.musicKit.player.isPlaying
    };
  };

  pause = () => {
    this.musicKit.pause();
  };

  play = () => {
    this.musicKit.play();
  };
}

decorate(PlayerStore, {
  musicKit: observable,
  initialized: observable,
  data: observable,
  timeString: computed,
  stop: action,
  play: action,
  update: action
});

export default new PlayerStore();
