import React from 'react';
import PropTypes from 'prop-types';

const MainCityItem = (props) => {
  const {menuCity, selectedCity, onClick} = props;

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${menuCity === selectedCity ? `tabs__item--active` : ``}`}
        href="#"
        onClick={onClick}
      >
        <span>{menuCity}</span>
      </a>
    </li>
  );
};

MainCityItem.propTypes = {
  menuCity: PropTypes.string.isRequired,
  selectedCity: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default MainCityItem;
