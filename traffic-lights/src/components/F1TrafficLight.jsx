import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const F1TrafficLight = () => {
  const { f1Phase, f1StateTimeLeft } = useContext(TrafficLightsContext);

  let activeColCount = 0;
  if (f1Phase === 'seq1') activeColCount = 1;
  if (f1Phase === 'seq2') activeColCount = 2;
  if (f1Phase === 'seq3') activeColCount = 3;
  if (f1Phase === 'seq4') activeColCount = 4;
  if (f1Phase === 'seq5' || f1Phase === 'yellow') activeColCount = 5;

  const isGo = f1Phase === 'go';
  const isYellow = f1Phase === 'yellow';
  const isIdle = f1Phase === 'idle';

  return (
    <div className="bg-base-300 w-full p-6 sm:p-10 rounded-[32px] shadow-inner flex flex-col items-center border border-white/5 relative overflow-hidden">
      
      {/* Header F1 */}
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-base-content/80 font-black tracking-[0.2em] uppercase text-sm sm:text-base">Formula 1</h3>
        {(isIdle || isGo) && (
          <span className="px-2.5 py-0.5 rounded-full bg-error/10 text-error border border-error/20 font-mono text-xs font-bold shadow-[0_0_10px_rgba(var(--er),0.1)]">
            {f1StateTimeLeft}s
          </span>
        )}
      </div>

      {/* Світлодіоди */}
      <div className="flex gap-3 sm:gap-5 mb-8">
        {[1, 2, 3, 4, 5].map(colIndex => {
          let lightClass = 'bg-base-100 shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)]'; 

          if (isGo) {
            lightClass = 'bg-success shadow-[0_0_30px_rgba(var(--su),0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]';
          } else if (isYellow) {
            lightClass = 'bg-warning shadow-[0_0_30px_rgba(var(--wa),0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]';
          } else if (colIndex <= activeColCount) {
            lightClass = 'bg-error shadow-[0_0_30px_rgba(var(--er),0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]';
          }

          return (
            <div key={colIndex} className="flex flex-col gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-base-content/10 transition-all duration-200 ${lightClass}`} />
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-base-content/10 transition-all duration-200 ${lightClass}`} />
            </div>
          );
        })}
      </div>

      {/* Текст статусу */}
      <div className={`text-2xl sm:text-4xl font-black uppercase tracking-[0.3em] transition-colors duration-300 ${
        isGo ? 'text-success drop-shadow-[0_0_10px_rgba(var(--su),0.4)]' : 
        isYellow ? 'text-warning drop-shadow-[0_0_10px_rgba(var(--wa),0.4)]' : 
        'text-base-content/20'
      }`}>
        {isGo ? 'GO!' : isYellow ? 'READY' : 'STOP'}
      </div>
    </div>
  );
};

export default F1TrafficLight;