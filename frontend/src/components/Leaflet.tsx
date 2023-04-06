import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Spinner from './Spinner';
import { LeafletProps } from '../common/types';

function isEmpty(value: string) {
  return (
    value == null || (typeof value === 'string' && value.trim().length === 0)
  );
}

function Leaflet({ address }: LeafletProps) {
  const [position, setPosition] = useState<any>();

  useEffect(() => {
    if (!isEmpty(address)) {
      console.log(address);
    } else {
      setPosition([45.689222, -73.67471]);
      return;
    }

    const config = {
      method: 'get',
      url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`,
    };

    axios(config)
      .then((response) => {
        setPosition(response.data.features[0].geometry.coordinates.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!position) {
    return <Spinner />;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ aspectRatio: '2 / 1', width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Leaflet;
