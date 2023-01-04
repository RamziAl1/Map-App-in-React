import React from "react";

function Searchresult(props) {
  return (
    <li
      className="search-result"
      onClick={() => props.onSelect(props.longitude, props.latitude)}
    >
      {props.country} - {props.region}
    </li>
  );
}

export default Searchresult;
