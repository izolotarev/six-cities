import PropTypes from 'prop-types';
import locationProp from './location.prop';

export default PropTypes.shape({
  location: locationProp,
  id: PropTypes.number.isRequired,
}).isRequired;
