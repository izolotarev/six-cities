import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const App = ({numberOfCards}) => {
  return (
    <Main numberOfCards={numberOfCards} />
  );
};

App.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
};

export default App;
