import { useState, useEffect } from "react";

export default function Search(props) {
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState([]);
  const { onCityChange, setForecast } = props;
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
    // eslint-disable-next-line
  }, [coord]);

  // fetch future forecast from API
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&cnt=5&appid=4920da1d765991ca446bd506bd9286d3&units=imperial`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data.list))
      .catch((error) => console.log(error));
    // eslint-disable-next-line
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
  console.log(suggestions);
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-10 flex w-screen justify-center h-25 z-10"
      >
        <div className="flex justify-center w-[500px]">
          <div className="pr-2">
            <label
              forHTML="location"
              className={`flex h-full justify-center w-auto`}
            >
              Search location:{" "}
            </label>
          </div>
          <div className="">
            <input
              style={{ outlineColor: "#C6E0FB" }}
              className=" pl-[4px] rounded-lg w-full text-center"
              placeholder="Enter city name"
              id="location"
              name="location"
              type="text"
              autoComplete="off"
              onChange={handleInputChange}
              onFocus={() => setFocus(true)}
              value={location}
            />
            <div className="z-10">
              {suggestions.length > 0 && focus
                ? suggestions.map((suggestion) =>
                    location === "" ? null : (
                      <div
                        key={suggestion.properties.placeId}
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
