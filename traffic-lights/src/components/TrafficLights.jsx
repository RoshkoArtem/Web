import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';
import Light from './Light';

const TrafficLights = ({ orientation }) => {
  const { lights } = useContext(TrafficLightsContext);

  const containerClass = orientation === 'horizontal'
    ? 'flex flex-row bg-gray-800 p-4 rounded-3xl w-max mx-auto shadow-2xl'
    : 'flex flex-col bg-gray-800 p-4 rounded-3xl w-max mx-auto shadow-2xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={containerClass}
    >
      {lights.map((light) => (
        <Light 
          key={light.id} 
          id={light.id} 
          tlColor={light.color} 
          clickCount={light.clickcount} 
        />
      ))}
    </motion.div>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default TrafficLights;
