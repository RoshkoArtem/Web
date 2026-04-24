import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const StatsBar = () => {
  const { lights, instanceClicks } = useContext(TrafficLightsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const totalClicks = Object.values(instanceClicks).reduce((sum, count) => sum + count, 0);
  const isHorizontal = location.pathname === '/horizontal';

  return (
    <div className="card bg-base-200 border border-base-300 shadow-xl mt-6 w-full max-w-4xl mx-auto">
      <div className="card-body text-center">
        <h2 className="card-title justify-center mb-2">Статистика кліків</h2>
        <p className="text-sm text-base-content/70 mb-4">Загалом натискань по інстансах: {totalClicks}</p>
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => navigate(isHorizontal ? '/vertical' : '/horizontal')}
          >
            Перемкнути на {isHorizontal ? 'вертикальний' : 'горизонтальний'} режим
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {lights.map(l => (
            <div key={l.id} className="badge badge-lg p-4 border-0" style={{ backgroundColor: l.color, color: '#111' }}>
              {l.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
