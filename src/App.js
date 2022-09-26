import DisplayWeather from "./components/DisplayWeather";
import Search from "./components/Search";
import { useState } from "react";
import "./App.css";

function App() {
  const [info, setInfo] = useState({});
  const [forecast, setForecast] = useState({});

  function handleCityChange(city) {
    setInfo(city);
  }

  return (
    <div className="App bg-red">
      <Search
        info={info}
        forecast={forecast}
        setForecast={setForecast}
        onCityChange={handleCityChange}
      />
      {Object.keys(info).length > 0 ? (
        <DisplayWeather info={info} forecast={forecast} />
      ) : null}
    </div>
  );
}

export default App;
