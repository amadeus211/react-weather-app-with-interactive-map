import React, { useState } from "react";
import Weather from "./Weather";
import Header from "./Header";

const App = () => {
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const [geoState, setGeoState] = useState(localStorage.getItem("geoState"));

  return (
    <>
      {geolocationLoaded && (
        <Header title={"Weather"} page={"Weather"} geoState={geoState}></Header>
      )}
      <Weather
        setGeolocationLoaded={(value) => {
          setGeolocationLoaded(value);
          setGeoState(localStorage.getItem("geoState"));
        }}
      ></Weather>
    </>
  );
};

export default App;
