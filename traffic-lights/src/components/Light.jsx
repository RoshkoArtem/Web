import PropTypes from 'prop-types';
import { motion, animate, useMotionValue, useTransform } from 'motion/react';

const Light = ({
  tlColor = '#ff0000',
  blinks = 3,
  duration = 0.15,
  brightness = 0.35,
  onClick,
  isActive = false,
}) => {
  const minBrightness = Math.min(1, Math.max(0.1, Number(brightness) || 0.35));
  const clickFilter = useMotionValue(1);
  const filter = useTransform(clickFilter, (v) => `brightness(${v})`);
  const lensOpacity = isActive ? 1 : 0.28;

  const handleLensClick = async () => {
    if (blinks <= 0) return;

    for (let i = 0; i < blinks; i++) {
      await animate(clickFilter, minBrightness, { duration });
      await animate(clickFilter, 1, { duration });
    }

    onClick?.();
  };

  const glowShadow = isActive ? `0 0 24px 1px ${tlColor}, 0 0 50px 10px ${tlColor}66` : 'none';

  return (
    <div className="relative">
      <motion.div
        onClick={handleLensClick}
        style={{
          width: 58,
          height: 58,
          borderRadius: '50%',
          cursor: 'pointer',
          filter,
          opacity: lensOpacity,
          position: 'relative',
          background: `radial-gradient(circle at 35% 30%, #ffffffcc 0%, ${tlColor} 24%, ${tlColor} 62%, #110f0f 100%)`,
          boxShadow: glowShadow,
          transition: 'opacity 0.25s ease, box-shadow 0.25s ease',
          border: '4px solid #171717',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        title={`Натисни — ${blinks} моргань`}
      >
        <div className="absolute top-[9px] left-[11px] w-4 h-2 bg-white/45 rounded-[50%] blur-[1px] rotate-[-28deg]" />
      </motion.div>
    </div>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  blinks: PropTypes.number,
  duration: PropTypes.number,
  brightness: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Light;
