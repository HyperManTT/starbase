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

    let styles = {
      background: "white",
      color: "white"
    };
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

  render() {
    return (
      <div className="SearchField">
        <input type="text" name="SearchTerm" onChange={this.handleChange} />
        {this.state.results.songs !== undefined ? (
          <div>
            <h2>Songs</h2>
            <ul className="Results">
              {this.state.results.songs.data.map(mediaItem => (
                <SongListItem key={mediaItem.id} mediaItem={mediaItem} />
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ margin: "20px" }} />
        )}
      </div>
    );
  }
}

export default inject("playerStore")(observer(SearchField));
