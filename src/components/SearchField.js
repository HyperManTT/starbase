import React, { Component } from "react";
import SongListItem from "./SongListItem";

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
        .search(event.target.value, { limit: 20, types: "songs" })
        .then(results => {
          this.setState({ results: results });
        });
    } else {
      this.setState({ results: {} });
    }
  };

  selectSong = song => {
    this.music.setQueue({ song: song.id }).then(queue => {
      this.music.play();
    });
  };

  render() {
    return (
      <div>
        <input type="text" name="SearchTerm" onChange={this.handleUpdate} />
        {this.state.results.songs !== undefined ? (
          <div>
            <h2>Songs</h2>
            <ul>
              {this.state.results.songs.data.map(songData => (
                <SongListItem songData={songData} onSelect={this.selectSong} />
              ))}
            </ul>
          </div>
        ) : (
          <div>No Songs</div>
        )}
      </div>
    );
  }
}

export default SearchField;
