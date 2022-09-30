import moment from "moment-timezone";

export default function DisplayWeather(props) {
  const { info, forecast } = props;
  var tz = moment.tz.guess();

  return (
    <>
      <div className='h-55'>
        <div className="w-screen flex justify-center items-center">
          <div className=" flex flex-col justify-center items-center mb-10 rounded-lg shadow-lg h-[340px] w-[300px] border-solid border-[#352D39] border-2">
            <div>
              {" "}
              <div className="text-center">
                {` ${moment(Date.now()).tz("America/New_York").format("M-DD")}`}
              </div>
              <div className="text-center">{` ${moment(Date.now())
                .tz(tz)
                .format("h:mm A")}`}</div>
            </div>
            <div className="text-lg font-bold text-center">
              {info.name}, {info.state}, {info.country}{" "}
            </div>
            <div>
              <img src={info.icon} alt={`${info.weather} icon`} />
            </div>

            <div
              className={`text-lg font-bold ${
                info.temp > 90
                  ? `text-red-500`
                  : info.temp < 50
                  ? `text-blue-300`
                  : null
              }`}
            >
              {" "}
              {Math.round(info.temp)} °F{" "}
            </div>
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
                    <div>
                      <div className="text-center font-bold">
                        {moment.unix(time.dt).tz(tz).format("h A")}
                      </div>
                      <div className=" flex flex-col justify-center items-center rounded-lg shadow-lg h-[260px] w-[240px] mb-4 border-solid border-[#352D39]  border-2">
                        <div>
                          {moment
                            .unix(time.dt)
                            .tz("America/New_York")
                            .format("M-DD")}
                        </div>
                        <div>
                          <img
                            alt={`${time.weather[0].main} icon`}
                            src={`http://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                          />
                        </div>
                        <div
                          className={`font-bold ${
                            time.main.temp > 90
                              ? `text-red-500`
                              : time.main.temp < 50
                              ? `text-blue-300`
                              : null
                          }`}
                        >
                          {Math.round(time.main.temp)} °F
                        </div>
                        <div className="text-md">{time.weather[0].main}</div>
                        <div className="text-sm">
                          {time.weather[0].description}
                        </div>{" "}
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
