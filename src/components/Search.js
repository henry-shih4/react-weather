import { useState, useEffect } from "react";

export default function Search(props) {
  const [location, setLocation] = useState("");
  const [coord, setCoord] = useState([]);
  const { info, onCityChange, forecast, setForecast } = props;
  const [submitted, setSubmitted] = useState(false);

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

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&cnt=5&appid=4920da1d765991ca446bd506bd9286d3&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => setForecast(data.list))
        .catch((error) => console.log(error));
    }
  }, [coord]);

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
      <form onSubmit={handleFormSubmit}>
        <label forHTML="location">Enter location: </label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
        />
        <button>go</button>
      </form>
    </>
  );
}
