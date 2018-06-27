import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthorizeButton from "./components/AuthorizeButton";
import SearchField from "./components/SearchField";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: window.MusicKitInstance.isAuthorized
    };
  }

  authStateChanged = () => {
    this.setState({ isLoggedIn: window.MusicKitInstance.isAuthorized });
  };

  signOff = () => {
    window.MusicKitInstance.unauthorize().then(this.authStateChanged);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.isLoggedIn ? (
          <div>
            <div>Signed In.</div>
            <button onClick={this.signOff}>Sign Off</button>
            <SearchField />
          </div>
        ) : (
          <AuthorizeButton authStateChanged={this.authStateChanged} />
        )}
      </div>
    );
  }
}

export default App;
