import React, { Component } from "react";

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", results: {} };
    this.music = window.MusicKitInstance;
  }

  handleUpdate = event => {
    this.setState({ searchTerm: event.target.value });
    if (event.target.value !== "") {
      this.music.api
        .search(event.target.value, { limit: 20, types: "artists,albums" })
        .then(results => {
          this.setState({ results: results });
        });
    } else {
      this.setState({ results: {} });
    }
  };

  render() {
    return (
      <div>
        <input type="text" name="SearchTerm" onChange={this.handleUpdate} />
        {this.state.results.artists !== undefined ? (
          <div>
            <h2>Artists</h2>
            <ul>
              {this.state.results.artists.data.map(result => (
                <li key={result.id}>{result.attributes.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No Artists</div>
        )}
        {this.state.results.albums !== undefined ? (
          <div>
            <h2>Albums</h2>
            <ul>
              {this.state.results.albums.data.map(result => (
                <li key={result.id}>
                  <img
                    src={result.attributes.artwork.url
                      .replace("{w}", "300")
                      .replace("{h}", "300")}
                    height="64"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No Albums</div>
        )}
      </div>
    );
  }
}

export default SearchField;
