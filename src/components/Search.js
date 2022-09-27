import { useState, useEffect } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

export default function Search(props) {
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState([]);
  const { info, onCityChange, forecast, setForecast } = props;
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (submitted) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=4920da1d765991ca446bd506bd9286d3&units=imperial`
      )
        .then((response) => response.json())
        .then((data) =>
          onCityChange({
            name: data.name,
            temp: data.main.temp,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            country: data.sys.country,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            state: coord[2],
          })
        )
        .catch((error) => console.log(error));
    }
  }, [coord]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&cnt=5&appid=4920da1d765991ca446bd506bd9286d3&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data.list))
      .catch((error) => console.log(error));
  }, [coord]);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=82f3fe01d1294f6d9460337e0115e5d2`
      )
        .then((response) => response.json())
        .then((data) => setSuggestions(data.features))
        .catch((error) => console.log(error));
    }
  }, [location]);

  function handleInputChange(e) {
    setLocation(e.target.value);
  }

  function handleSelectClick(e) {
    let searchCoord = e.target.getAttribute("data-value").split(",");
    setCoord([searchCoord[0], searchCoord[1]]);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=4920da1d765991ca446bd506bd9286d3`
    )
      .then((response) => response.json())
      .then((data) => setCoord([data[0].lat, data[0].lon, data[0].state]))
      .catch((error) => console.log(error));
    setSubmitted(true);
  }

  return (
    <>
      <form
        className="mb-16 flex justify-center items-center"
        onSubmit={handleFormSubmit}
      >
        <label forHTML="location" className="mr-2">
          Enter location:{" "}
        </label>
        <div>
          <input
            className={`mr-2 ${focus ? "bg-sky-200" : "bg-white"}`}
            placeholder="Enter city name"
            id="location"
            name="location"
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
            onFocus={() => setFocus(true)}
            // onBlur={() => setFocus(false)}
            value={location}
          />
          <div className="">
            {suggestions.length > 0 && focus
              ? suggestions.map((suggestion) =>
                  location == "" ? null : (
                    <div
                      className="hover:bg-sky-200 cursor-pointer"
                      onClick={handleSelectClick}
                      data-value={[
                        suggestion.properties.lat,
                        suggestion.properties.lon,
                      ]}
                    >
                      {suggestion.properties.city},{" "}
                      {suggestion.properties.state},{" "}
                      {suggestion.properties.country}
                    </div>
                  )
                )
              : null}
          </div>
        </div>
        <button>Search</button>
      </form>
    </>
  );
}
