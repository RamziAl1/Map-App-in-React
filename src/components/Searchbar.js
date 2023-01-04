import React, { useState } from "react";
import axios from "axios";
import Searchresult from "./Searchresult";

function Searchbar(props) {
  const API_KEY = "cf56da8dae59c65a1a46acbba5bafbcd";
  const [city, setCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function getCoordinates(city) {
    try {
      const response = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${city}`
      );
      const data = response.data.data;
      if (data.length === 0) return null;
      const reducedSearchResults = data.map((item) => ({
        longitude: item.longitude,
        latitude: item.latitude,
        country: item.country,
        region: item.region,
      }));
      return reducedSearchResults;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    const results = await getCoordinates(city);

    if (results) {
      const displayedResults = results.map((item, index) => (
        <Searchresult
          key={index}
          region={item.region}
          country={item.country}
          longitude={item.longitude}
          latitude={item.latitude}
          onSelect={props.setNewCenter}
        />
      ));
      setSearchResults(displayedResults);
    } else {
      const noResultsMessege = () => <div>no results found</div>;
      setSearchResults(noResultsMessege);
    }
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          placeholder="city name"
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button type="submit">Find city</button>
      </form>

      <ul>{searchResults}</ul>
    </div>
  );
}

export default Searchbar;
