import React, { useEffect, useState } from "react";
import GeoIndicator from "./GeoIndicator";

export default function Header({ title, page, geoState }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTitles = () => {
    if (isMobile && page === "homePage") {
      return <h1>{title}</h1>;
    }
    if (isMobile && page === "Weather") {
      return (
        <>
          <h1>{title}</h1>
          <h1>
            <GeoIndicator geoState={geoState} />
          </h1>
        </>
      );
    }
    return (
      <>
        <h1 className="break-words">Oleksandr Maliuk</h1>
        <h1>{title}</h1>
        <h1>
          {page === "homePage" ? "amadeus211" : <GeoIndicator geoState={geoState} />}
        </h1>
      </>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 text-2xl font-bold px-10 py-4 flex items-center justify-between">
      {renderTitles()}
    </div>
  );
}
