import moment from "moment-timezone";

export default function DisplayWeather(props) {
  const { info, forecast } = props;
  console.log(forecast);
  return (
    <>
      <div>
        <div>Weather</div>
        <div>
          City: {info.name}, {info.state}, {info.country}{" "}
        </div>
        <div>
          <img src={info.icon} />
        </div>
        <div>Temperature: {info.temp} °F </div>
        <div>Outside: {info.weather}</div>
        <div>Description: {info.description}</div>
      </div>

      <div>
        <div>Forecast</div>
        {forecast &&
          forecast.map((time) => (
            <div>
              {moment.unix(time.dt).tz("CST").format("YYYY-MM-DDTHH:mm:ssZ")}
            </div>
          ))}
      </div>
    </>
  );
}
