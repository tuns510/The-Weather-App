import { useState } from "react";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [wdetails, setWdetails] = useState();
  let [isloading, setIsloading] = useState(false);

  let getData = (event) => {
    setIsloading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
        setIsloading(false);
      });
    event.preventDefault();
    setCity("");
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-[40px] font-bold py-[50px] text-white">
          The Weather App
        </h1>
        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[300px] h-[40px] pl-3"
            placeholder="City Name"
          />
          <button className="bg-[darkblue] text-white h-[41px] w-[80px] ml-[5px] rounded">
            Submit
          </button>
        </form>
        <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGtzZGVtZDEzMm93NndjbDM0YnRieXd2MWQwM3l1MDRteDlmZGo5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.webp"
            width={180}
            className={`absolute left-[40%] h-[180px] ${
              isloading ? "" : "hidden"
            }`}
          />
          {wdetails !== undefined ? (
            <>
              <h3 className="font-bold text-[30px]">
                {wdetails.name}{" "}
                <span className="bg-[yellow]">{wdetails.sys.country}</span>
              </h3>
              <h2 className="font-bold text-[40px]">{wdetails.main.temp}</h2>
              <img
                src={`https://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}
              />
              <p>{wdetails.weather[0].description}</p>
            </>
          ) : (
            "No Data Found"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
