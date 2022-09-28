import { useState, useEffect } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

export default function Search(props) {
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState([]);
  const { info, onCityChange, forecast, setForecast } = props;
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [focus, setFocus] = useState(false);

  //fetch current weather data using coordinates from geomap
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

  // fetch future forecast from API
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&cnt=5&appid=4920da1d765991ca446bd506bd9286d3&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data.list))
      .catch((error) => console.log(error));
  }, [coord]);

  // autocomplete on input
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

  //sets coordinates to option clicked from drop-down
  function handleSelectClick(e) {
    let searchCoord = e.target.getAttribute("data-value").split(",");
    console.log(searchCoord);
    setCoord([searchCoord[0], searchCoord[1], searchCoord[2]]);
    setSubmitted(true);
    setFocus(false);
  }

  return (
    <>
      <form className="mb-16 flex w-screen justify-center">
        <div className="flex justify-center w-full">
          <div className="pr-2">
            <label forHTML="location" className="flex">
              Search location:{" "}
            </label>
          </div>
          <div className="">
            <input
              style={{ outline: "none" }}
              className={`p-[2px] mr-2 w-[200px] rounded-lg ${
                focus ? "border-solid border-red-200 border-2" : null
              }`}
              placeholder="Enter city name"
              id="location"
              name="location"
              type="text"
              autoComplete="off"
              onChange={handleInputChange}
              onFocus={() => setFocus(true)}
              value={location}
            />
            <div className="">
              {suggestions.length > 0 && focus
                ? suggestions.map((suggestion) =>
                    location == "" ? null : (
                      <div
                        key={suggestion.properties.lat}
                        className="hover:bg-sky-200 cursor-pointer"
                        onClick={handleSelectClick}
                        data-value={[
                          suggestion.properties.lat,
                          suggestion.properties.lon,
                          suggestion.properties.state,
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
        </div>
      </form>
    </>
  );
}
