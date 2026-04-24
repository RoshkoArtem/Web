import { useContext } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import Light from './Light';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const lightVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const TrafficLights = ({ instanceId, orientation = 'horizontal' }) => {
  const { lights, activeAutoLightId, incrementClick, instanceClicks } =
    useContext(TrafficLightsContext);

  const isHorizontal = orientation === 'horizontal';

  const layoutClass = isHorizontal
    ? 'flex-row px-5 py-5 gap-3'
    : 'flex-col px-5 py-5 gap-3';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={orientation}
      className={`flex items-center justify-center rounded-[18px] border border-[#0d0d0d] bg-gradient-to-b from-[#3d3d3d] to-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_30px_rgba(0,0,0,0.45)] ${layoutClass}`}
    >
      {lights.map((light) => {
        const clickCount = instanceId
          ? (instanceClicks[`${instanceId}_${light.id}`] || 0)
          : light.clickcount || 0;

        return (
          <motion.div
            key={light.id}
            variants={lightVariants}
            className="flex flex-col items-center gap-2 rounded-xl bg-[#1f1f1f] border border-black/60 p-2 min-w-[84px]"
          >
            <Light
              tlColor={light.color}
              blinks={light.blinks}
              duration={light.duration}
              brightness={light.brightness}
              isActive={activeAutoLightId === light.id}
              onClick={() => incrementClick(instanceId, light.id)}
            />
            <div className="w-full min-h-[28px] px-2 py-1 bg-black/45 rounded-md border border-white/10 text-[10px] font-semibold tracking-wide text-center tabular-nums text-gray-200 leading-tight">
              <span className="block text-[9px] uppercase text-gray-400">Кліки</span>
              <span>{clickCount}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

TrafficLights.propTypes = {
  instanceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default TrafficLights;