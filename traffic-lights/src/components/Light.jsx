import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const Light = ({ id, tlColor = 'red', clickCount = 0 }) => {
  const { incrementClick } = useContext(TrafficLightsContext);

  return (
    <div className="flex flex-col items-center mx-2 my-2">
      <motion.div
        whileTap={{ scale: 0.9, opacity: 0.5 }}
        onClick={() => incrementClick(id)}
        className="w-16 h-16 rounded-full cursor-pointer shadow-lg border-2 border-gray-600 dark:border-gray-300"
        style={{ backgroundColor: tlColor }}
      />
      <span className="text-sm font-bold mt-2 badge badge-outline">{clickCount}</span>
    </div>
  );
};

Light.propTypes = {
  id: PropTypes.number.isRequired,
  tlColor: PropTypes.string,
  clickCount: PropTypes.number
};

export default Light;
