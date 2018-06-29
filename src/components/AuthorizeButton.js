import React from "react";

const auth = authStateChanged => {
  window.MusicKit.getInstance()
    .authorize()
    .then(authStateChanged);
};

const AuthorizeButton = ({ authStateChanged }) => {
  return <button onClick={() => auth(authStateChanged)}>Authorize</button>;
};

export default AuthorizeButton;
