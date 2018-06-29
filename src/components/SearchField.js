import React, { Component } from "react";
import SongListItem from "./SongListItem";
import "./SearchField.css";
import { inject, observer } from "mobx-react";
import { debounce } from "lodash";

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", results: {} };
    this.music = window.MusicKit.getInstance();
    this.onChangeDebounced = debounce(this.onChange, 250);
  }

  handleChange = event => {
    event.persist();
    this.onChangeDebounced(event);
  };

  onChange = event => {
    this.setState({ searchTerm: event.target.value });
    if (this.state.searchTerm !== "") {
      this.music.api
        .search(this.state.searchTerm, { limit: 20, types: "songs" })
        .then(results => {
          this.setState({ results: results });
        });
    } else {
      this.setState({ results: {} });
    }
  };

  selectSong = song => {
    this.music.setQueue({ song: song.id }).then(queue => {
      this.props.playerStore.play();
    });
  };

  render() {
    return (
      <div className="SearchField">
        <input type="text" name="SearchTerm" onChange={this.handleChange} />
        {this.state.results.songs !== undefined ? (
          <div>
            <h2>Songs</h2>
            <ul className="Results">
              {this.state.results.songs.data.map(songData => {
                let imageURL = window.MusicKit.formatArtworkURL(
                  songData.attributes.artwork,
                  16
                );
                return (
                  <SongListItem
                    key={songData.id}
                    songData={songData}
                    imageURL={imageURL}
                    onSelect={this.selectSong}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <div>No Songs</div>
        )}
      </div>
    );
  }
}

export default inject("playerStore")(observer(SearchField));
