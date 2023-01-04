import React from "react";

function Sidebar(props) {
  return (
    <div className="sidebar">
      Longitude: {props.longitude} | Latitude: {props.latitude} | Zoom:{" "}
      {props.zoom}
    </div>
  );
}

export default Sidebar;
