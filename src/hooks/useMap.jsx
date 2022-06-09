import {useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';

const useMap = (mapRef, city) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      console.log(instance);

      const layer = new TileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution:
            `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
          },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
};

export default useMap;
