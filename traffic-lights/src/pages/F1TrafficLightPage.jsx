import { useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';
import TrafficLights from '../components/TrafficLights';
import F1TrafficLight from '../components/F1TrafficLight';

const F1TrafficLightPage = () => {
  const {
    isAutoGreen,
    autoTimeLeft,
    startF1Sequence,
    f1Phase,
    f1StateTimeLeft,
  } = useContext(TrafficLightsContext);

  const canToggle = !isAutoGreen && (f1Phase === 'idle' || f1Phase === 'go');

  const buttonLabel =
    f1Phase === 'idle' ? 'Запустити F1' :
      f1Phase === 'go' ? 'Зупинити F1' :
        'Послідовність...';

  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto p-4 sm:p-8">
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full mt-4">

        {/* ── ЛІВА КАРТКА: Автомобільний світлофор ── */}
        <div className="flex flex-col items-center flex-1 w-full max-w-[500px] p-8 rounded-[32px] border border-white/10 bg-base-200/40 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 tracking-wide">
            Автомобільний
          </h2>
          
          <div className="text-gray-500 mb-8 flex items-center gap-3 text-xs tracking-widest uppercase">
            Наступний стан через
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-xs shadow-[0_0_15px_rgba(var(--p),0.1)]">
              {autoTimeLeft}с
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-center my-4">
            <TrafficLights orientation="vertical" instanceId="auto_main" />
          </div>

          {/* Заглушка висоти або зелене повідомлення */}
          <div className="h-14 mt-6 flex items-end">
            {isAutoGreen && (
              <div className="badge badge-success badge-lg gap-2 shadow-[0_0_15px_rgba(var(--su),0.2)] font-bold tracking-wider uppercase text-xs py-4 px-6 border-success/30 bg-success/10 text-success">
                Світить зелений! Авто їдуть.
              </div>
            )}
          </div>
        </div>

        {/* ── РОЗДІЛЮВАЧ (daisyUI) ── */}
        <div className="divider lg:divider-horizontal text-base-content/40 text-[10px] font-black tracking-[0.2em] uppercase">
          Sync
        </div>

        {/* ── ПРАВА КАРТКА: Світлофор F1 ── */}
        <div className="flex flex-col items-center flex-1 w-full max-w-[600px] p-8 rounded-[32px] border border-white/10 bg-base-200/40 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 tracking-wide">
            Світлофор F1
          </h2>

          {/* Місце під таймер F1 */}
          <div className="h-8 mb-4">
            {!isAutoGreen && (f1Phase === 'idle' || f1Phase === 'go') && (
              <div className="text-gray-500 flex items-center gap-3 text-xs tracking-widest uppercase">
                Зміна стану через
                <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-mono text-xs shadow-[0_0_15px_rgba(var(--s),0.1)]">
                  {f1StateTimeLeft}с
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 w-full flex flex-col justify-center">
            <F1TrafficLight />
          </div>

          {/* Блок керування F1 */}
          <div className="mt-8 text-center w-full flex flex-col items-center gap-4">
            <button
              className={`btn ${f1Phase === 'go' ? 'btn-error' : 'btn-primary'} btn-outline w-full sm:w-auto shadow-lg tracking-widest uppercase text-xs`}
              onClick={startF1Sequence}
              disabled={!canToggle}
            >
              {buttonLabel}
            </button>

            {/* Заглушка для помилки або лоадера */}
            <div className="h-12 w-full flex justify-center items-center mt-2">
              {!isAutoGreen && f1Phase !== 'idle' && f1Phase !== 'go' && (
                <span className="loading loading-dots loading-md text-base-content/30"></span>
              )}
              
              {isAutoGreen && (
                <div className="alert alert-error shadow-[0_0_15px_rgba(var(--er),0.1)] py-2 rounded-xl text-[10px] sm:text-xs border-error/20 bg-error/10 text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-bold tracking-widest uppercase">Не можна змінювати, коли авто-світлофор зелений.</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default F1TrafficLightPage;