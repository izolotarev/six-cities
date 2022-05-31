import PropTypes from 'prop-types';
import userProp from './user.prop';

export default PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: userProp,
}).isRequired;

