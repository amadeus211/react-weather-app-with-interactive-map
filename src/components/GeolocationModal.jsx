import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

let width;


export default function GeolocationModal({ modalOpen, handleCloseGeoModal }) {
  useEffect(() => {
    width = window.innerWidth;
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 350,
    width: width < 768 ? "99%" : 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <Modal open={modalOpen} onClose={handleCloseGeoModal}>
      <Box sx={style}>
        <h2 className="text-red-500 text-2xl mb-4">Attention</h2>
        <p className="text-xl">
          We cannot tell you the current weather for your location, please
          enable geo-location to use this feature.
        </p>
      </Box>
    </Modal>
  );
}
