import React, {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const/const';
import 'leaflet/dist/leaflet.css';
import cityProp from '../../types/city.prop';
import mapPointsProp from '../../types/mapPoints.prop';
import PropTypes from 'prop-types';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map = ({city, points, selectedPoint}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
              selectedPoint !== undefined && point.id === selectedPoint
                ? currentCustomIcon
                : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: `100%`, width: `100%`}} ref={mapRef}></div>;
};

Map.propTypes = {
  city: cityProp,
  points: PropTypes.arrayOf(mapPointsProp),
  selectedPoint: PropTypes.number,
};

export default Map;
