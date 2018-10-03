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

  currentPlaybackTime = 0;
  currentPlaybackTimeRemaining = 0;
  currentMediaItem = null;
  isPlaying = false;

  data = {
    currentPlaybackDuration: 0,
    currentVolume: 1,
    audioNode: null
  };

  items = [];

  get timeString() {
    let pad = function(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    };
    let currentTime = moment.duration(this.currentPlaybackTime, "seconds");
    let remainingTime = moment.duration(
      this.currentPlaybackTimeRemaining,
      "seconds"
    );
    return `${currentTime.minutes()}:${pad(
      currentTime.seconds()
    )} : -${remainingTime.minutes()}:${pad(remainingTime.seconds())}`;
  }

  getTimeElapsed() {
    return this.currentPlaybackTime;
  }

  getCurrentPlaybackDuration() {
    let totalTime =
      this.currentPlaybackTime + this.currentPlaybackTimeRemaining;
    // console.log("Calc: " + this.currentPlaybackTime + "/" + totalTime )
    return totalTime;
  }

  constructor() {
    if (window.MusicKit !== undefined) {
      this.setup();
    } else {
      document.addEventListener("musickitloaded", this.setup);
    }
  }

  setup = () => {
    this.musicKit = window.MusicKit.configure({
      developerToken:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVONzQ5NEhGNDcifQ.eyJpYXQiOjE1Mjk2OTUwMTgsImV4cCI6MTU0NTI0NzAxOCwiaXNzIjoiMlVKNUY0TVU1VSJ9.5xv6wLb7VeHt5wttDu7AFhSiqE8849rjMvdlvaKO00qzmzGwkxJJ5rovsCBKZ8ZFV02VKnpLcXTQIe0sQjKilw",
      app: {
        name: "starbase.tokyo",
        build: "1983.10.14"
      }
    });

    this.musicKit.addEventListener(
      Events.playbackStateDidChange,
      action(() => {
        this.isPlaying = this.musicKit.player.isPlaying;
      })
    );

    this.musicKit.addEventListener(Events.primaryPlayerDidChange, this.pause);

    this.musicKit.addEventListener(
      Events.mediaItemDidChange,
      this.updateMediaItem
    );

    this.musicKit.addEventListener(
      Events.playbackTimeDidChange,
      this.updateTime
    );

    this.musicKit.addEventListener(Events.playbackVolumeDidChange, this.update);
  };

  updateMediaItem = () => {
    this.currentMediaItem = this.musicKit.player.nowPlayingItem;
  };

  updateTime = () => {
    this.currentPlaybackTime = this.musicKit.player.currentPlaybackTime;
    this.currentPlaybackTimeRemaining = this.musicKit.player.currentPlaybackTimeRemaining;
  };

  update = () => {
    this.data = {
      currentPlaybackDuration: this.musicKit.player.currentPlaybackDuration,
      currentPlaybackVolume: this.musicKit.player.currentPlaybackVolume,
      audioNode: this.musicKit._player
    };
  };

  pause = () => {
    this.musicKit.pause();
  };

  setVolume = value => {
    const volumeValue = value < 0 ? 0 : value > 1 ? 1 : value;
    this.musicKit._player.volume = volumeValue;
  };

  remove = mediaItem => {
    const index = this.items.indexOf(mediaItem);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  };

  play = mediaItem => {
    if (mediaItem !== undefined) {
      this.musicKit.setQueue({ song: mediaItem.id }).then(queue => {
        this.musicKit.play();
      });
    } else {
      this.musicKit.play();
    }
  };

  next = () => {
    this.play(this.items.shift());
  };

  add = mediaItem => {
    this.items.push(mediaItem);
  };

  seek = value => {
    this.musicKit.seekToTime(value);
  };
}

decorate(PlayerStore, {
  currentPlaybackTime: observable,
  currentPlaybackTimeRemaining: observable,
  currentMediaItem: observable,
  isPlaying: observable,
  items: observable,
  musicKit: observable,
  initialized: observable,
  data: observable,
  timeString: computed,
  stop: action,
  play: action,
  update: action,
  updateTime: action,
  setVolume: action,
  updateMediaItem: action,
  remove: action,
  add: action,
  next: action,
  previous: action,
  seek: action
});

export default new PlayerStore();
