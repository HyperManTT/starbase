import React from "react";

const AlbumListItem = ({ albumData }) => (
  <li key={albumData.id}>
    <img
      alt="Album Art"
      src={albumData.attributes.artwork.url
        .replace("{w}", "300")
        .replace("{h}", "300")}
      height="64"
    />
  </li>
);

export default AlbumListItem;
