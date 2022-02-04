import axios from "axios";
import { useState } from "react";

function TheData() {
  const [queryLat, setQueryLat] = useState("");
  const [queryLon, setQueryLon] = useState("");
  const [condition, setCondition] = useState([]);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${queryLat}&lon=${queryLon}&appid=12d3adfe978b0ab375b9df3962e8836b`;
  async function getData() {
    const result = await axios(url);
    setCondition([result.data]);
    console.log(result.data);
  }
  const submitForm = (e) => {
    e.preventDefault();
    getData();
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Insert the latitude"
          value={queryLat}
          onChange={(e) => setQueryLat(e.target.value)}
        />
      </form>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Insert the longitude"
          value={queryLon}
          onChange={(e) => setQueryLon(e.target.value)}
        />
        <div>
          <button id="submit" type="submit">
            Check
          </button>
        </div>
      </form>
      {condition.map((item, index) => {
        const iconurl =
          "http://openweathermap.org/img/wn/" +
          `${item.weather[0].icon}` +
          ".png";
        return (
          <div id="data" key={index}>
            <p id="image">
              <img src={iconurl} />
            </p>
            <p>
              <span>Location</span> : {item.name} {item.sys.country}{" "}
            </p>
            <p>
              <span>Temperature</span> : {Math.floor(item.main.temp - 273.15)}{" "}
              <sup>o</sup>
            </p>
            <p>
              <span>Feels Like</span> : {item.main.feels_like}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TheData;
