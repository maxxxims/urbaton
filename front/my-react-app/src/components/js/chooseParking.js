// ChooseParking.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { YMaps, Map, ObjectManager, Placemark, GeolocationControl } from "@pbe/react-yandex-maps";
import '../css/сhooseParking.css';

const ChooseParking = () => {
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [parks, setParks] = useState([]);
    const [initialDisplayCount, setInitialDisplayCount] = useState(5);
    const [filteredParks, setFilteredParks] = useState([]);
    const [showMoreParks, setShowMoreParks] = useState(true);

    const handleLocationClick = (park) => {
        setSelectedLocation(park);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleBookingNow = (park) => {
        alert("Место забронировано!");
        console.log("Место успешно забронировано.");
        handleModalClose();
    }

    const handleShowMore = () => {
        setShowMoreParks(!showMoreParks);
        setInitialDisplayCount(initialDisplayCount + 5);
        setFilteredParks(parks.slice(0, initialDisplayCount + 5));
      };
      

    const ParkingModal = ({ location, onClose, onBookNow }) => (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Информация о выбранном месте:</h3>
                <p>{location.address}</p>
                <button onClick={() => onBookNow(location)}>Забронировать место</button>
            </div>
        </div>
    );

    useEffect(() => {
        const fetchParks = async () => {
            try {
              const response = await fetch('http://localhost:8000/park/get_all');
              const data = await response.json();
              setParks(data);
              setFilteredParks(data.slice(0, initialDisplayCount));
            } catch (error) {
              console.error('Error fetching parks:', error);
            }
          };
        fetchParks();
    }, []);

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

    //const filteredParks = parks.filter(park => park
        //park.address?.toLowerCase().includes(searchQuery.toLowerCase())
    //);
    

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
                {filteredParks.map(park => (
                    <li
                        key={park.id}
                        className={`list-item ${selectedLocation === park ? 'selected' : ''}`}
                        onClick={() => handleLocationClick(park)}
                    >
                        {park.address}
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
                <button onClick={handleShowMore}> {showMoreParks? 'Показать больше' : 'Скрыть'}</button>
            </div>
        </div>
    );
};

export default ChooseParking;
