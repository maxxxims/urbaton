import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { YMaps, Map, ObjectManager, Placemark, GeolocationControl } from "@pbe/react-yandex-maps";
import '../css/сhooseParking.css';

const ChooseParking = () => {
  const navigate = useNavigate();
  const locations = [
    {
      id: 1,
      coordinates: [37.55, 55.65],
      info: "Парковочное место 1: ул. Ленина, д. 1"
    },
    {
      id: 2,
      coordinates: [40.43, 39.91],
      info: "Парковочное место 2: ул. Пушкина, д. 2"
    }
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBookingNow = (location) => {
    alert("Место забронировано!");
    console.log("Место успешно забронировано.");
    handleModalClose();
  }

  const ParkingModal = ({ location, onClose, onBookNow }) => (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Информация о выбранном месте:</h3>
        <p>{location.info}</p>
        <button onClick={() => onBookNow(location)}>Забронировать место</button>
      </div>
    </div>
  );

  const MyComponent = () => (
    <YMaps>
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 10,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
        style={{ width: "500px", height: "300px" }}
      >
        <GeolocationControl options={{ float: "left" }} />
        <Placemark defaultGeometry={[55.751574, 37.573856]} />
        <ObjectManager
          options={{
            clusterize: true,
            gridSize: 32,
          }}
          objects={{
            openBalloonOnClick: true,
            preset: "islands#greenDotIcon",
          }}
          clusters={{
            preset: "islands#redClusterIcons",
          }}
          filter={(object) => object.id % 2 === 0}
          modules={[
            "objectManager.addon.objectsBalloon",
            "objectManager.addon.objectsHint",
          ]}
        />
      </Map>
    </YMaps>
  );

  const filteredLocations = locations.filter(location =>
    location.info.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="map-container">
        {navigate && (
          <div className="back-arrow" onClick={() => navigate('/')}>
            ← Главная страница
          </div>
        )}

        <h1>Выберите парковочное место</h1>
        <MyComponent />
      </div>
      <div className="list-container">
        <input
          type="text"
          placeholder="Поиск парковочных мест"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h2 className="list-header">Список парковочных мест</h2>
        <ul className="list">
          {filteredLocations.map(location => (
            <li
              key={location.id}
              className={`list-item ${selectedLocation === location ? 'selected' : ''}`}
              onClick={() => handleLocationClick(location)}
            >
              {location.info}
            </li>
          ))}
        </ul>
        {selectedLocation && isModalOpen && (
          <ParkingModal
            location={selectedLocation}
            onClose={handleModalClose}
            onBookNow={handleBookingNow}
          />
        )}
      </div>
    </div>
  );
};

export default ChooseParking;
