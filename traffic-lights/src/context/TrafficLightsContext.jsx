import { createContext, useState, useEffect } from 'react';

export const TrafficLightsContext = createContext();

export const TrafficLightsProvider = ({ children }) => {
  const [lights, setLights] = useState([]);
  const [activeAutoLightId, setActiveAutoLightId] = useState(1); // 1: Red, 2: Yellow, 3: Green
  const [f1State, setF1State] = useState('stop'); // 'stop' | 'start'

  // Fetch data from json-server
  useEffect(() => {
    fetch('http://localhost:3000/lights')
      .then(res => res.json())
      .then(data => setLights(data))
      .catch(err => console.error("json-server not running?", err));
  }, []);

  // Sync F1 when Auto Light changes
  useEffect(() => {
    if (activeAutoLightId === 3) {
      setF1State('stop');
    }
  }, [activeAutoLightId]);

  // F1 Auto-toggle every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setF1State(prev => {
        if (activeAutoLightId === 3) return 'stop'; // Block toggle if green
        return prev === 'stop' ? 'start' : 'stop';
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [activeAutoLightId]);

  const incrementClick = (id) => {
    // Set as active
    setActiveAutoLightId(id);

    // Update click count locally
    const updatedLights = lights.map(light => 
      light.id === id ? { ...light, clickcount: light.clickcount + 1 } : light
    );
    setLights(updatedLights);

    // Save to json-server
    const lightToUpdate = updatedLights.find(l => l.id === id);
    if (lightToUpdate) {
      fetch(`http://localhost:3000/lights/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clickcount: lightToUpdate.clickcount })
      }).catch(err => console.error("Failed to update json-server", err));
    }
  };

  const toggleF1State = () => {
    if (activeAutoLightId === 3) return; // Prevent change
    setF1State(prev => prev === 'stop' ? 'start' : 'stop');
  };

  return (
    <TrafficLightsContext.Provider value={{
      lights,
      activeAutoLightId,
      incrementClick,
      f1State,
      toggleF1State
    }}>
      {children}
    </TrafficLightsContext.Provider>
  );
};
