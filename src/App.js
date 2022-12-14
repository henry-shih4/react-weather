import DisplayWeather from "./components/DisplayWeather";
import Search from "./components/Search";
import { useState } from "react";
import Header from "./components/Header";
import TemplateDisplay from "./components/TemplateDisplay";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [info, setInfo] = useState({});
  const [forecast, setForecast] = useState({});

  function handleCityChange(city) {
    setInfo(city);
  }

  return (
    <div className="App font-open flex flex-col h-screen">
      <Header />
      <Search
        info={info}
        forecast={forecast}
        setForecast={setForecast}
        onCityChange={handleCityChange}
      />
      {Object.keys(info).length > 0 ? (
        <DisplayWeather
          className="h-max w-screen"
          info={info}
          forecast={forecast}
        />
      ) : (
        <TemplateDisplay />
      )}
      <Footer />
    </div>
  );
}

export default App;
