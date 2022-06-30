import React, {useRef, useEffect, memo} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const/const';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import offerProp from '../../types/offer.prop';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const Map = ({offers, selectedPoint}) => {
  const city = offers[0].city;
  const points = offers.map((offer) => ({location: offer.location, id: offer.id}));

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

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude]);
    }
  }, [map, city]);

  return <div style={{height: `100%`}} ref={mapRef}></div>;
};

Map.propTypes = {
  offers: PropTypes.arrayOf(offerProp),
  selectedPoint: PropTypes.number,
};

export default memo(Map);
