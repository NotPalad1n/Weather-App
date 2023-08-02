import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import "../styles/search.css"

const Search = ({onSearchChange}) => {
  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "564100c406mshb4aad432a20bc87p1cb136jsn6775b95374a5",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  const [search, setSearch] = React.useState("null");

  const loadOptions = async (input) => {
    try {
      const response = await fetch(`${url}?namePrefix=${input}&limit=10&sort=-population`, options);
      const result = await response.json();

      return {
        options: result.data.map((city) => {
          return {
            lon: city.longitude,
            lat: city.latitude,
            label: `${city.name} : ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData);
  };

  return (
    <div className="search">
      <AsyncPaginate
        placeholder="Search for a city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
