import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthorizeButton from "./components/AuthorizeButton";
import SearchField from "./components/SearchField";
import Player from "./components/Player";
import PlayerStore from "./PlayerStore";
import { autorun } from "mobx";
import { Provider, observer } from "mobx-react";
import { delay } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: window.MusicKit.getInstance().isAuthorized
    };
    this.albumArtRef = React.createRef();
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
    this.albumArtRef.current.style.opacity = 0;
    img.onload = () => {
      delay(() => {
        this.albumArtRef.current.style.backgroundImage = `url(${artURL})`;
        this.albumArtRef.current.style.opacity = 1;
      }, 500);
    };
    img.src = artURL;
  };

  render() {
    return (
      <Provider playerStore={PlayerStore}>
        <div className="App">
          <header className="App-header">
            <div
              className="albumArt"
              ref={this.albumArtRef}
              style={{ opacity: 0 }}
            />
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {this.state.isLoggedIn ? (
            <div>
              <div>Signed In.</div>
              <button onClick={this.signOff}>Sign Off</button>
              <Player />
              <SearchField />
            </div>
          ) : (
            <AuthorizeButton authStateChanged={this.authStateChanged} />
          )}
        </div>
      </Provider>
    );
  }
}

export default observer(App);
