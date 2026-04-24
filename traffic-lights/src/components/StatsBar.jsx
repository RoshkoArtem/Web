import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const StatsBar = () => {
  const { lights } = useContext(TrafficLightsContext);

  return (
    <div className="card bg-base-100 shadow-xl mt-6 max-w-lg mx-auto">
      <div className="card-body text-center">
        <h2 className="card-title justify-center mb-4">Статистика кліків</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {lights.map(l => (
            <div key={l.id} className="badge badge-lg p-4" style={{ backgroundColor: l.color, color: '#000' }}>
              {l.description} - {l.clickcount}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
