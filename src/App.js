import DisplayWeather from "./components/DisplayWeather";
import Search from "./components/Search";
import { useState } from "react";
import Header from "./components/Header";
import TemplateDisplay from "./components/TemplateDisplay";
import "./App.css";

function App() {
  const [info, setInfo] = useState({});
  const [forecast, setForecast] = useState({});

  function handleCityChange(city) {
    setInfo(city);
  }

  return (
    <div className="App font-open">
      <Header />
      <Search
        info={info}
        forecast={forecast}
        setForecast={setForecast}
        onCityChange={handleCityChange}
      />
      {Object.keys(info).length > 0 ? (
        <DisplayWeather
          className="h-screen w-screen"
          info={info}
          forecast={forecast}
        />
      ) : (
        <TemplateDisplay />
      )}
    </div>
  );
}

export default App;
