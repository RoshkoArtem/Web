import { useState, useContext } from 'react';
import { TrafficLightsContext } from '../context/TrafficLightsContext';

const SettingsPage = () => {
  const { 
    lights, 
    updateLight,
    trafficLightInstances, 
    addTrafficLightInstance, 
    deleteTrafficLightInstance 
  } = useContext(TrafficLightsContext);

  const [newOrientation, setNewOrientation] = useState('horizontal');

  const handleAddInstance = (e) => {
    e.preventDefault();
    addTrafficLightInstance(newOrientation);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 sm:p-8 gap-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-2">Налаштування світлофорів</h2>
        <p className="text-base-content/70">Керування інстансами та параметрами анімації з Lab 6</p>
      </div>

      <div className="w-full card bg-base-200 border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Інстанси світлофорів</h3>
          <form onSubmit={handleAddInstance} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="form-control">
              <label className="label"><span className="label-text">Орієнтація</span></label>
              <select
                value={newOrientation}
                onChange={(e) => setNewOrientation(e.target.value)}
                className="select select-bordered"
              >
                <option value="horizontal">Горизонтальний</option>
                <option value="vertical">Вертикальний</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Додати інстанс</button>
          </form>

          {trafficLightInstances.length === 0 ? (
            <p className="text-sm text-base-content/70 mt-4">Інстансів ще немає.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {trafficLightInstances.map((instance) => (
                <div key={instance.id} className="rounded-xl bg-base-100 border border-base-300 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{instance.orientation === 'horizontal' ? 'Горизонтальний' : 'Вертикальний'}</p>
                    <p className="text-xs text-base-content/60">ID: {instance.id}</p>
                  </div>
                  <button onClick={() => deleteTrafficLightInstance(instance.id)} className="btn btn-error btn-xs">Видалити</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full card bg-base-200 border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Кольори та анімація</h3>
          <p className="text-sm text-base-content/70">
            За умовою: тільки 3 кольори — червоний, помаранчевий, зелений. Налаштовуються лише параметри анімації.
          </p>

          <div className="overflow-x-auto mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th>Колір</th>
                  <th>Назва</th>
                  <th>Моргань</th>
                  <th>Тривалість (сек)</th>
                  <th>Яскравість</th>
                </tr>
              </thead>
              <tbody>
                {lights.map((light) => (
                  <tr key={light.id}>
                    <td>
                      <input
                        type="color"
                        value={light.color}
                        disabled
                        className="h-10 w-14 rounded border border-base-300 cursor-pointer bg-transparent"
                      />
                    </td>
                    <td>
                      <input type="text" value={light.description} disabled className="input input-sm input-bordered w-full" />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={light.blinks || 3}
                        onChange={(e) => updateLight(light.id, { blinks: Number(e.target.value) })}
                        className="input input-sm input-bordered w-24"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        min="0.05"
                        value={light.duration || 0.15}
                        onChange={(e) => updateLight(light.id, { duration: Number(e.target.value) })}
                        className="input input-sm input-bordered w-28"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="1"
                        value={light.brightness !== undefined ? light.brightness : 0.35}
                        onChange={(e) => updateLight(light.id, { brightness: Number(e.target.value) })}
                        className="input input-sm input-bordered w-24"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
