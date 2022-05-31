import PropTypes from 'prop-types';
import locationProp from './location.prop';

export default PropTypes.shape({
  location: locationProp,
  name: PropTypes.string.isRequired,
}).isRequired;
