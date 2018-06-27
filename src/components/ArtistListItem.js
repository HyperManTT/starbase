import React from "react";

const ArtistListItem = ({ artistData }) => (
  <li key={artistData.id}>{artistData.attributes.name}</li>
);

export default ArtistListItem;
