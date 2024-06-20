import React from "react";
import Red from "../images/redCircle.png";
import Green from "../images/greenCircle.png";

export default function GeoIndicator({ geoState }) {
  return (
    <div className="flex justify-center items-center space-x-3">
      <p>Geolocation</p>
      {geoState === "true" ? (
        <img src={Green} alt="Green Circle" className="w-6 h-6" />
      ) : (
        <img src={Red} alt="Red Circle" className="w-6 h-6" />
      )}
    </div>
  );
}
