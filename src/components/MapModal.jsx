import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../images/marker.png";
import L from "leaflet";

let width;

const markerIcon = new L.Icon({
  iconUrl: MarkerIcon,
  iconRetinaUrl: MarkerIcon,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

export default function MapModal({
  modalOpen,
  setModalOpen,
  currentPosition,
  setCurrentPosition,
  setCardClick,
  setInitCoord,
}) {
  const [coordinates, setCoordinates] = useState({
    latitude: currentPosition.latitude,
    longitude: currentPosition.longitude,
  });

  useEffect(() => {
    if (modalOpen) {
      setCoordinates({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
      });
    }
  }, [modalOpen, currentPosition]);

  const mapRef = useRef(null);

  const HandleMapClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoordinates({
          latitude: lat,
          longitude: lng,
        });
      },
    });
    return null;
  };

  const handleModalClose = () => {
    setCurrentPosition({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    // setInitCoord(false);
    setCardClick(true);
    setModalOpen(false);
  };

  useEffect(() => {
    width = window.innerWidth;
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width < 768 ? "99%" : "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          {currentPosition.latitude && currentPosition.longitude && (
            <MapContainer
              center={[currentPosition.latitude, currentPosition.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <HandleMapClick />
              <Marker
                position={[coordinates.latitude, coordinates.longitude]}
                icon={markerIcon}
              >
              </Marker>
            </MapContainer>
          )}
        </Box>
      </Modal>
    </>
  );
}
