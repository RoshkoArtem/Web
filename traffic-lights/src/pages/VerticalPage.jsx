import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';
import TrafficLights from '../components/TrafficLights';
import StatsBar from '../components/StatsBar';
import { Link } from 'react-router-dom';

const VerticalPage = () => {
  const { autoTimeLeft, trafficLightInstances, isLoading } = useContext(TrafficLightsContext);

  const verticalInstances = trafficLightInstances.filter(tl => tl.orientation === 'vertical');

  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto p-4 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-black mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
        Вертикальні світлофори
      </h2>
      
      <div className="flex items-center gap-4 mb-12">
        <p className="text-gray-500 flex items-center gap-3 text-sm tracking-widest uppercase">
          Зміна стану через 
          <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-xs shadow-[0_0_15px_rgba(var(--p),0.1)]">
            {autoTimeLeft}s
          </span>
        </p>
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 justify-items-center">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <span className="loading loading-ring loading-lg text-primary"></span>
            <p className="mt-4 text-gray-500 font-medium tracking-tight">Syncing with Cloud...</p>
          </div>
        ) : verticalInstances.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/5 w-full max-w-2xl">
            <p className="text-xl text-gray-500 italic mb-6">No active instances found.</p>
            <Link to="/settings" className="btn btn-primary btn-outline px-8">Add New Instance</Link>
          </div>
        ) : (
          verticalInstances.map((instance, index) => (
            <div key={instance.id} className="w-full max-w-[280px] flex flex-col items-center gap-4 group p-5 rounded-2xl border border-white/10 bg-base-200/40">
              <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="h-[1px] w-4 bg-white/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Instance {index + 1}</span>
                <div className="h-[1px] w-4 bg-white/20" />
              </div>
              <TrafficLights orientation="vertical" instanceId={instance.id} />
            </div>
          ))
        )}
      </div>

      <div className="w-full mt-20 border-t border-white/5 pt-10">
        <StatsBar />
      </div>
    </div>
  );
};

export default VerticalPage;
