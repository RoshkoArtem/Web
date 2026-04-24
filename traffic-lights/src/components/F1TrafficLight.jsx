import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const F1TrafficLight = () => {
  const { f1State } = useContext(TrafficLightsContext);

  // F1 state is either 'stop' (red) or 'start' (green)
  return (
    <div className="flex flex-col bg-gray-900 p-6 rounded-3xl w-max mx-auto shadow-2xl items-center border-4 border-gray-700">
      <div className="text-white font-bold mb-4 tracking-widest text-xl">FORMULA 1</div>
      
      {/* Light Array */}
      <div className="flex gap-4">
        {/* We display 5 lights. If state is stop, they are red. If start, they are green (or off and 1 green) */}
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            className={`w-12 h-12 rounded-full border-2 border-gray-600 transition-colors duration-300 shadow-inner 
              ${f1State === 'stop' ? 'bg-red-600 shadow-red-500/50' : 'bg-green-500 shadow-green-500/50'}`}
          ></div>
        ))}
      </div>
      
      <div className="mt-6 text-2xl font-black uppercase tracking-widest text-white">
        {f1State === 'stop' ? 'STOP' : 'GO'}
      </div>
    </div>
  );
};

export default F1TrafficLight;
