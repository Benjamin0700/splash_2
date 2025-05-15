import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Component for handling map click events
function LocationSelector({ setCoordinates, setFullAddress }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates([lat, lng]);

      // Reverse geocoding API
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        if (data && data.display_name) {
          setFullAddress(data.display_name);
        }
      } catch (error) {
        console.error('Failed to fetch address:', error);
      }
    },
  });

  return null;
}

export default function Address({ onClose }) {
  const [nickname, setNickname] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [coordinates, setCoordinates] = useState([41.3111, 69.2797]); // Default: Tashkent

  const handleAdd = () => {
    if (!nickname || !fullAddress) return;

    const newAddress = {
      id: Date.now(),
      nickname,
      fullAddress,
      isDefault,
      location: {
        lat: coordinates[0],
        lng: coordinates[1],
      },
    };

    const existing = JSON.parse(localStorage.getItem('addresses')) || [];
    const updated = [...existing, newAddress];
    localStorage.setItem('addresses', JSON.stringify(updated));
    localStorage.setItem('selectedAddress', JSON.stringify(newAddress));
    onClose();
  };

  return (
    <div className="relative bg-white rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Address</h2>
        <button onClick={onClose} className="text-xl font-bold">×</button>
      </div>

      {/* Map */}
      <div className="mb-4 h-52 rounded-lg overflow-hidden">
        <MapContainer
          center={coordinates}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coordinates} />
          <LocationSelector
            setCoordinates={setCoordinates}
            setFullAddress={setFullAddress}
          />
        </MapContainer>
      </div>

      {/* Nickname Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Address Nickname</label>
        <select
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 text-sm"
        >
          <option value="">Choose one</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Full Address Input */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Full Address</label>
        <input
          type="text"
          placeholder="Enter your full address..."
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 text-sm"
        />
      </div>

      {/* Default Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm text-gray-700">Make this as a default address</label>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={!nickname || !fullAddress}
        className={`w-full text-white py-3 rounded-lg font-semibold ${
          nickname && fullAddress ? 'bg-black' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Add
      </button>
    </div>
  );
}
