import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';
import TrafficLights from '../components/TrafficLights';
import F1TrafficLight from '../components/F1TrafficLight';

const F1TrafficLightPage = () => {
  const { lights, toggleF1State } = useContext(TrafficLightsContext);

  // Check if auto-traffic light is green (assuming id 3 is Green)
  const isAutoGreen = lights.find(l => l.id === 3)?.clickcount > 0; // Simplified logic: if green was clicked, or we can just check if there's a specific active state.
  // Actually, we need to know the CURRENT active light in auto-light. 
  // For simplicity and based on the task: "if auto light shows green" -> 
  // Let's implement an activeLight state in Context, but since we use clickcounts as per previous labs,
  // we can use a derived state: activeLight. Let's assume Context provides `activeAutoLightId`.
  const { activeAutoLightId } = useContext(TrafficLightsContext);

  const isGreen = activeAutoLightId === 3; // 3 is Green in db.json

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center justify-center p-8 w-full">
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-2xl font-bold mb-6">Автомобільний Світлофор</h2>
        <TrafficLights orientation="vertical" />
        {isGreen && <div className="mt-4 badge badge-success gap-2 p-4">Світить зелений!</div>}
      </div>

      <div className="divider lg:divider-horizontal">СИНХРОНІЗАЦІЯ</div>

      <div className="flex flex-col items-center flex-1">
        <h2 className="text-2xl font-bold mb-6">Світлофор F1</h2>
        <F1TrafficLight />
        
        <div className="mt-8">
          <button 
            className="btn btn-warning btn-lg shadow-xl"
            onClick={toggleF1State}
            disabled={isGreen}
          >
            Змінити стан F1
          </button>
          
          {isGreen && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Не можна змінювати, коли авто-світлофор зелений.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default F1TrafficLightPage;
