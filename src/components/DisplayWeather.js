import moment from "moment-timezone";

export default function DisplayWeather(props) {
  const { info, forecast } = props;
  const d = new Date();
  console.log(info);
  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="flex flex-col justify-center items-center mb-10 rounded-lg shadow-lg h-[340px] w-[300px] border-solid border-red-200 border-2">
          <div>
            {" "}
            <div>
              {` ${moment(Date.now())
                .tz("America/New_York")
                .format("MM-DD-YY")}`}
            </div>
            <div>
              {` ${moment(Date.now()).tz("America/New_York").format("HH:mm")}`}{" "}
              EST
            </div>
          </div>
          <div className="text-lg font-bold">
            {info.name}, {info.state}, {info.country}{" "}
          </div>
          <div>
            <img src={info.icon} />
          </div>

          <div className="text-lg font-bold"> {info.temp} °F </div>
          <div className="text-md">{info.weather}</div>
          <div className="text-sm">{info.description}</div>
        </div>
      </div>
      <div>
        <div className="text-center text-2xl mt-4 m-auto w-screen">
          Forecast
        </div>
        <div className="mt-4 flex w-screen flex-wrap justify-evenly items-center h-max">
          {forecast
            ? forecast.map((time) => (
                <>
                  <div className="flex flex-col justify-center items-center rounded-lg shadow-lg h-[260px] w-[240px] mb-4 border-solid border-red-200 border-2">
                    <div>
                      {moment
                        .unix(time.dt)
                        .tz("America/New_York")
                        .format("MM-DD-YY")}
                    </div>
                    <div>
                      {moment
                        .unix(time.dt)
                        .tz("America/New_York")
                        .format("HH:mm")}{" "}
                      EST
                    </div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${time.weather[0].icon}.png`}
                      />
                    </div>
                    <div className="font-bold">{time.main.temp} °F</div>
                    <div className="text-md">{time.weather[0].main}</div>
                    <div className="text-sm">
                      {time.weather[0].description}
                    </div>{" "}
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
