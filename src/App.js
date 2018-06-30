import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthorizeButton from "./components/AuthorizeButton";
import SearchField from "./components/SearchField";
import Player from "./components/Player";
import PlayerStore from "./PlayerStore";
import { Provider, observer } from "mobx-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: window.MusicKit.getInstance().isAuthorized
    };
  }

  authStateChanged = () => {
    this.setState({ isLoggedIn: window.MusicKit.getInstance().isAuthorized });
  };

  signOff = () => {
    window.MusicKit.unauthorize().then(this.authStateChanged);
  };

  render() {
    let artURL =
      PlayerStore.currentMediaItem !== null
        ? PlayerStore.currentMediaItem.attributes.artwork.url
        : "";
    return (
      <Provider playerStore={PlayerStore}>
        <div className="App">
          <header className="App-header">
            <div
              className="albumArt"
              style={{
                backgroundImage: `url(${artURL})`,
                opacity: PlayerStore.data.isPlaying ? 1 : 0
              }}
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
