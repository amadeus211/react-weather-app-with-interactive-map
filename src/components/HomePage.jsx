import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function HomePage() {
  const [checked, setChecked] = useState(
    localStorage.getItem("geolocationAccept") === "true"
  );
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("geolocationAccept", "false");
  }, []);

  const handleButtonCLick = () => {
    if (checked) {
      navigate("/weather");
      localStorage.setItem("geolocationAccept", "true");
    } else {
      navigate("/weather");
      localStorage.setItem("geolocationAccept", "false");
    }
  };

  return (
    <div >
      <Header title={"Home Page"} page={"homePage"}></Header>

      <div className="flex h-screen w-screen justify-center items-center flex-col space-y-5  bg-gradient-to-r from-sky-100 to-violet-200">
        <div
          className={`flex flex-col h-auto sm:w-[400px] w-[80%] space-y-2  border-4 rounded-3xl  p-[35px] bg-white shadow-2xlborder-2xl ${
            checked ? "border-blue-500" : "border-rose-500"
          }`}
        >
          <p className="text-xl">
            We need to use your geolocation for the full operation of the
            application, you can refuse this, but the functionality may be
            reduced
          </p>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                size="large"
              />
            }
            label="Agree"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "1.2rem",
              },
            }}
          />{" "}
          <button
            className={`border rounded p-4 text-white  text-xl ${
              checked
                ? "bg-blue-400  hover:bg-blue-500"
                : "bg-red-400 hover:bg-red-500 "
            }`}
            onClick={handleButtonCLick}
          >
            Go to Weather
          </button>
        </div>
      </div>
    </div>
  );
}
