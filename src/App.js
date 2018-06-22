import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorizeButton from './components/AuthorizeButton';
import SearchField from './components/SearchField';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: window.MusicKitInstance.isAuthorized,
        }
    }

    authStateChanged = () => {
        console.log("authStateChanged")
        this.setState({ isLoggedIn: window.MusicKitInstance.isAuthorized })
    }

    signOff = () => {
        console.log("Sign off pressed")
        window.MusicKitInstance.unauthorize().then(this.authStateChanged)
    }

    render() {
        console.log("rendering")
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                { this.state.isLoggedIn ? (
                    <div>
                        <div>Signed In.</div>
                        <button onClick={this.signOff}>Sign Off</button>
                        <SearchField></SearchField>
                    </div>
                ) : (
                        <AuthorizeButton authStateChanged={this.authStateChanged}></AuthorizeButton>
                    )
                }
            </div>
        )
    }
}



export default App;
