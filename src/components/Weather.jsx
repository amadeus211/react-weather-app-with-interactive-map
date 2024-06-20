import React, { useState, useEffect } from "react";
import { API_KEY } from "../const";
import MapModal from "./MapModal";
import Temp from "../images/thermometer.png";
import Wind from "../images/wind.png";
import Humidity from "../images/humidity.png";
import Loading from "./Loading";
import GeolocationModal from "./GeolocationModal";
import { useNavigate } from "react-router";

let intervalId;

export default function Weather({ setGeolocationLoaded }) {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [currenttime, setCurrenttime] = useState("");
  const [cardClick, setCardClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseLoading, setResponseLoading] = useState(false);

  const [initCoord, setInitCoord] = useState(false);
  const [geolocationAccept, setGeolocationAccept] = useState(
    localStorage.getItem("geolocationAccept")
  );
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const [openGeolocationModal, setOpenGeolocationModal] = useState(false);
  const [weather, setWeather] = useState({
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    iconUrl: "",
    description: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [geoState, setGeoState] = useState(localStorage.getItem("geoState"));

  function success(position) {
    setCurrentPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error() {
    fetchCity(51.509865, -0.118092);
    // localStorage.setItem("geolocationAccept", "false");
    // setGeolocationAccept("false");
    setOpenGeolocationModal(true);
    localStorage.setItem("geoState", "false");
    setGeoState("false");
    setGeolocationLoaded(true);
  }

  useEffect(() => {
    console.log("current pos", currentPosition);
  }, [currentPosition]);

  const getCurrentTime = (timezoneOffsetInSeconds) => {
    const now = new Date();
    const utcTimeInMillis = now.getTime() + now.getTimezoneOffset() * 60000;
    const timezoneOffsetInMillis = timezoneOffsetInSeconds * 1000;
    const localTimeInMillis = utcTimeInMillis + timezoneOffsetInMillis;
    const localTime = new Date(localTimeInMillis);
    setCurrenttime(localTime.toLocaleTimeString());
  };

  useEffect(() => {
    if (
      currentPosition.latitude !== null &&
      currentPosition.longitude !== null &&
      !initCoord
    ) {
      fetchCity(currentPosition.latitude, currentPosition.longitude);
    } else {
      setInitCoord(false);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (navigator.geolocation && geolocationAccept === "true") {
      navigator.geolocation.getCurrentPosition(success, error);
      localStorage.setItem("geoState", "true");
      setGeoState("true");
      setGeolocationLoaded(true);
    } else {
      error();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchCity = async (lat, lon) => {
    try {
      setResponseLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      if (data.name !== "") {
        if (cityName === "" || cardClick) {
          setCityName(data.name);
          setCardClick(false);
          clearInterval(intervalId);
        }
        intervalId = setInterval(() => {
          getCurrentTime(data.timezone);
        }, 1000);
        setWeather({
          temperature: Math.round(data.main.temp - 273.15),
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description: data.weather[0].description,
        });
        setCurrentPosition({
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        });
        setInitCoord(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  const fetchCoords = async (city) => {
    try {
      setResponseLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCurrentPosition({ latitude: data[0].lat, longitude: data[0].lon });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  const sendQuery = () => {
    fetchCoords(inputCity);
    setCityName(inputCity);
    setInputCity("");
    clearInterval(intervalId);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseGeoModal = () => {
    setOpenGeolocationModal(false);
  };

  if (loading || responseLoading) {
    return <Loading />;
  }

  return (
    <>
      {currentPosition.latitude &&
        currentPosition.longitude &&
        cityName.length !== 0 &&
        currenttime !== "" && (
          <div className="flex  h-[100%] sm:h-[100vh] w-screen justify-center items-center flex-col space-y-5 sm:py-[13rem] py-[10rem] bg-gradient-to-r from-sky-100 to-violet-200 " >
            {(geolocationAccept === "false" || geoState === "false")  && (
                <div className="flex flex-col h-auto sm:w-[400px] w-[80%] space-y-2 border rounded-3xl p-[35px] bg-white shadow-2xl">
                  <button
                    className="hover:border-blue-500 border-[3px] border-red-300 p-2 rounded-2xl text-red-500 font-bold hover:text-blue-500"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <p className="font-normal">
                      Terms of use have or geolocation share not been confirmed
                    </p>
                    Click here to accept
                  </button>
                </div>
              )}

            <div className="flex flex-col h-auto sm:w-[400px] w-[80%] space-y-2 border rounded-3xl p-[35px] bg-white shadow-2xl">
              <div className="flex flex-row justify-between">
                <p className="text-center text-xl text-black">{cityName}</p>
                <p className="text-center text-xl text-black">{currenttime}</p>
              </div>
              <div className="flex justify-center flex-col py-4 items-center">
                <span className="text-3xl">{weather.temperature}°C</span>
                <span className="text-md">{weather.description}</span>
              </div>
              <div className="flex flex-row justify-between items-center text-lg tracking-wide">
                <div className="flex flex-col items-start space-y-1">
                  <span className="flex items-center">
                    <img className="w-6 h-6 mr-1" src={Temp} alt="" />
                    {weather.temperature}°C
                  </span>
                  <span className="flex items-center">
                    <img className="w-6 h-6 mr-1" src={Wind} alt="" />
                    {weather.windSpeed} km/h
                  </span>
                  <span className="flex items-center">
                    <img className="w-6 h-6 mr-1" src={Humidity} alt="" />
                    {weather.humidity}%
                  </span>
                </div>
                <div>
                  <img src={weather.iconUrl} alt="Weather Icon" />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-auto sm:w-[400px] w-[80%] space-y-2 border rounded-3xl p-[35px] bg-white shadow-2xl">
              <input
                type="text"
                value={inputCity}
                placeholder="City"
                className="border rounded p-3"
                onChange={(e) => {
                  setInputCity(e.target.value);
                }}
              />
              <button
                onClick={sendQuery}
                className="border rounded bg-slate-400 p-4 text-white hover:bg-slate-500 text-xl"
              >
                Send
              </button>
              <button
                onClick={handleOpenModal}
                className="border rounded bg-red-300 hover:bg-red-400 p-4 text-white text-xl"
              >
                Open Map
              </button>
            </div>
            
          </div>
        )}
      {modalOpen && (
        <MapModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          setCardClick={setCardClick}
          setInitCoord={setInitCoord}
        />
      )}
      {openGeolocationModal && (
        <GeolocationModal
          modalOpen={openGeolocationModal}
          handleCloseGeoModal={handleCloseGeoModal}
        />
      )}
    </>
  );
}
