import React from "react";
import Button from "@material-ui/core/Button";

const auth = authStateChanged => {
  window.MusicKit.getInstance()
    .authorize()
    .then(authStateChanged);
};

const AuthorizeButton = ({ authStateChanged }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => auth(authStateChanged)}
    >
      Sign In to Apple Music
    </Button>
  );
};

export default AuthorizeButton;
