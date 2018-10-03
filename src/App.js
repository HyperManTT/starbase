import React, { Component } from "react";
import "./App.css";
import AuthorizeButton from "./components/AuthorizeButton";
import SearchField from "./components/SearchField";
import Player from "./components/Player";
import PlayerStore from "./PlayerStore";
import { autorun } from "mobx";
import { Provider, observer } from "mobx-react";
import { delay } from "lodash";
import QueueItem from "./components/QueueItem";
import Button from "@material-ui/core/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: window.MusicKit.getInstance().isAuthorized
    };
    this.albumArtBGRef = React.createRef();
    this.albumArtRef = React.createRef();
    this.albumInfoRef = React.createRef();

    autorun(() => {
      if (PlayerStore.currentMediaItem !== null) {
        this.handleArtChange(
          PlayerStore.currentMediaItem.attributes.artwork.url
        );
      }
    });
  }

  authStateChanged = () => {
    this.setState({ isLoggedIn: window.MusicKit.getInstance().isAuthorized });
  };

  signOff = () => {
    window.MusicKit.unauthorize().then(this.authStateChanged);
  };

  handleArtChange = artURL => {
    const img = new Image();
    this.albumArtBGRef.current.style.opacity = 0;
    this.albumInfoRef.current.style.opacity = 0;
    this.albumArtRef.current.style.transform = `scale(0)`;
    img.onload = () => {
      delay(() => {
        this.albumArtBGRef.current.style.backgroundImage = `url(${artURL})`;
        this.albumArtRef.current.style.backgroundImage = `url(${artURL})`;
      }, 300);
      delay(() => {
        this.albumArtBGRef.current.style.opacity = 1;
        this.albumInfoRef.current.style.opacity = 1;
        this.albumArtRef.current.style.transform = `scale(1)`;
      }, 650);
    };
    img.src = artURL;
  };

  render() {
    return (
      <Provider playerStore={PlayerStore}>
        <div className="App">
          <header className="App-header">
            <div
              className="albumArtBG"
              ref={this.albumArtBGRef}
              style={{ opacity: 0 }}
            />
            <div className="albumArt" ref={this.albumArtRef}>
              <div className="albumInfo" ref={this.albumInfoRef}>
                {PlayerStore.currentMediaItem !== null ? (
                  <div>
                    <div className="title">
                      {PlayerStore.currentMediaItem.attributes.name}
                    </div>
                    <div className="artist">
                      {PlayerStore.currentMediaItem.attributes.artistName}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </header>
          {this.state.isLoggedIn ? (
            <div>
              <div className="authButton">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.signOff}
                >
                  Sign Out Of Apple Music
                </Button>
              </div>

              <Player />
              <div>
                <h3>Queue</h3>
                {PlayerStore.items.length === 0 ? (
                  <div>Empty Queue</div>
                ) : (
                  <div>
                    <ul className="Results">
                      {PlayerStore.items.map(mediaItem => (
                        <QueueItem
                          key={mediaItem.id}
                          mediaItem={mediaItem}
                          disabled={PlayerStore.currentMediaItem === mediaItem}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                <SearchField />
              </div>
            </div>
          ) : (
            <div className="authButton">
              <AuthorizeButton authStateChanged={this.authStateChanged} />
            </div>
          )}
        </div>
      </Provider>
    );
  }
}

export default observer(App);
