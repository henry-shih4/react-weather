import moment from "moment-timezone";

export default function DisplayWeather(props) {
  const { info, forecast } = props;
  console.log(forecast);
  const d = new Date();
  return (
    <>
      <div className="flex flex-col w-screen justify-center items-center mb-14">
        <div>Current Weather</div>
        <div>
          City: {info.name}, {info.state}, {info.country}{" "}
        </div>
        <div>
          <img src={info.icon} />
        </div>
        <div>
          Day and Time:
          {` ${moment(Date.now())
            .tz("America/New_York")
            .format("MM-DD-YY HH:mm")}`}{" "}
          EST
        </div>
        <div>Temperature: {info.temp} °F </div>
        <div>Outside: {info.weather}</div>
        <div>Description: {info.description}</div>
      </div>

      <div>
        <div className="text-center text-2xl mt-4 m-auto w-screen">
          Forecast for next 15 hours
        </div>
        <div className="mt-4 bg-red flex w-screen flex-wrap justify-evenly items-center">
          {forecast
            ? forecast.map((time) => (
                <>
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${time.weather[0].icon}.png`}
                      />
                    </div>
                    <div>
                      {moment
                        .unix(time.dt)
                        .tz("America/New_York")
                        .format("MM-DD-YY HH:mm")}{" "}
                      EST
                    </div>
                    <div>Temp: {time.main.temp} °F</div>
                    <div>Outside: {time.weather[0].main}</div>
                    <div>Description: {time.weather[0].description}</div>{" "}
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
