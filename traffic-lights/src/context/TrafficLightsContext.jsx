import { createContext, useState, useEffect } from 'react';

export const TrafficLightsContext = createContext();

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWLfmm2dCbg5ZEVvIynkXvkN6pSxp7pkmWQd20e1k2MEWWcfqDfmtBNPyBqBwQe9lQXA/exec';
const BASE_LIGHTS = [
  { id: 1, color: '#ff0000', description: 'Червоний' },
  { id: 2, color: '#ff8c00', description: 'Помаранчевий' },
  { id: 3, color: '#00c853', description: 'Зелений' },
];
const COLOR_BY_ID = { 1: 'red', 2: 'yellow', 3: 'green' };

export const TrafficLightsProvider = ({ children }) => {
  const [lights, setLights] = useState(
    BASE_LIGHTS.map((l) => ({ ...l, blinks: 3, duration: 0.15, brightness: 0.35, clickcount: 0 }))
  );
  const [trafficLightInstances, setTrafficLightInstances] = useState([]);
  const [instanceClicks, setInstanceClicks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Auto light
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [autoTimeLeft, setAutoTimeLeft] = useState(30);

  // F1 light
  const [f1Phase, setF1Phase] = useState('idle');
  const [f1StateTimeLeft, setF1StateTimeLeft] = useState(10);

  const mapApiLightsToState = (apiLights) => {
    const safeLights = Array.isArray(apiLights) ? apiLights : [];

    const nextInstances = safeLights.map((item) => ({
      id: Number(item.id),
      name: item.name || `Світлофор #${item.id}`,
      orientation: item.orientation === 'horizontal' ? 'horizontal' : 'vertical',
      activeColor: item.activeColor || 'red',
    }));

    const nextInstanceClicks = {};
    safeLights.forEach((item) => {
      const id = Number(item.id);
      nextInstanceClicks[`${id}_1`] = Number(item.redClicks || 0);
      nextInstanceClicks[`${id}_2`] = Number(item.yellowClicks || 0);
      nextInstanceClicks[`${id}_3`] = Number(item.greenClicks || 0);
    });

    const totalRed = safeLights.reduce((acc, item) => acc + Number(item.redClicks || 0), 0);
    const totalYellow = safeLights.reduce((acc, item) => acc + Number(item.yellowClicks || 0), 0);
    const totalGreen = safeLights.reduce((acc, item) => acc + Number(item.greenClicks || 0), 0);

    setTrafficLightInstances(nextInstances);
    setInstanceClicks(nextInstanceClicks);
    setLights((prev) =>
      prev.map((light) => {
        if (light.id === 1) return { ...light, clickcount: totalRed };
        if (light.id === 2) return { ...light, clickcount: totalYellow };
        return { ...light, clickcount: totalGreen };
      })
    );
  };

  const fetchAllLights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getAllLights&t=${Date.now()}`);
      const data = await res.json();
      if (data?.status === 'ok') {
        mapApiLightsToState(data.data);
      }
    } catch (err) {
      console.error('Failed to load traffic lights from GAS', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback sequences if lights are empty
  const autoSequence = lights.length >= 3
    ? [lights[0].id, lights[1].id, lights[2].id, lights[1].id]
    : [1, 2, 3, 2];

  const activeAutoLightId = autoSequence[sequenceIndex];
  const isAutoGreen = activeAutoLightId === (lights[2]?.id || 3);

  // ── Auto light timer ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (sequenceIndex + 1) % autoSequence.length;
          setSequenceIndex(nextIndex);
          return nextIndex === 1 || nextIndex === 3 ? 5 : 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sequenceIndex, autoSequence.length]);

  useEffect(() => {
    fetchAllLights();
  }, []);

  // ── F1 State Machine ─────────────────────────────────────────────────
  useEffect(() => {
    if (isAutoGreen) {
      setF1Phase('idle');
      setF1StateTimeLeft(10);
    }
  }, [isAutoGreen]);

  useEffect(() => {
    if (isAutoGreen) return;
    let timer;

    if (f1Phase === 'idle' || f1Phase === 'go' || f1Phase === 'yellow') {
      timer = setInterval(() => {
        setF1StateTimeLeft((prev) => {
          if (prev <= 1) {
            if (f1Phase === 'idle') setF1Phase('seq1');
            else if (f1Phase === 'yellow') { setF1Phase('go'); return 10; }
            else if (f1Phase === 'go') setF1Phase('idle');
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      timer = setInterval(() => {
        setF1Phase((current) => {
          switch (current) {
            case 'seq1': return 'seq2';
            case 'seq2': return 'seq3';
            case 'seq3': return 'seq4';
            case 'seq4': return 'seq5';
            case 'seq5': setF1StateTimeLeft(10); return 'yellow';
            default: return 'idle';
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [f1Phase, isAutoGreen]);

  const startF1Sequence = () => {
    if (isAutoGreen) return;
    if (f1Phase === 'idle') setF1Phase('seq1');
    else if (f1Phase === 'go') {
      setF1Phase('idle');
      setF1StateTimeLeft(10);
    }
  };

  // ── Clicks CRUD ──────────────────────────────────────────────────────
  const incrementClick = (instanceId, lightId) => {
    const targetId = Number(instanceId);
    const color = COLOR_BY_ID[Number(lightId)];
    if (!targetId || !color) return;

    setInstanceClicks((prev) => {
      const key = `${targetId}_${lightId}`;
      const newCount = (prev[key] || 0) + 1;
      return { ...prev, [key]: newCount };
    });

    setLights((prev) =>
      prev.map((light) =>
        Number(light.id) === Number(lightId)
          ? { ...light, clickcount: Number(light.clickcount || 0) + 1 }
          : light
      )
    );

    fetch(`${GOOGLE_SCRIPT_URL}?action=addClick&id=${targetId}&color=${color}`).catch(console.error);
  };

  const addLight = () => {};

  const updateLight = (id, updates) => {
    setLights((prev) => prev.map((light) => (light.id === id ? { ...light, ...updates } : light)));
  };

  const deleteLight = () => {};

  const addTrafficLightInstance = async (orientation) => {
    try {
      await fetch(`${GOOGLE_SCRIPT_URL}?action=addLight&orientation=${orientation}`);
      await fetchAllLights();
    } catch (err) {
      console.error('Failed to add traffic light', err);
    }
  };

  const deleteTrafficLightInstance = async (id) => {
    try {
      await fetch(`${GOOGLE_SCRIPT_URL}?action=deleteLight&id=${id}`);
      await fetchAllLights();
    } catch (err) {
      console.error('Failed to delete traffic light', err);
    }
  };

  return (
    <TrafficLightsContext.Provider
      value={{
        lights,
        trafficLightInstances,
        activeAutoLightId,
        isAutoGreen,
        autoTimeLeft,
        incrementClick,
        f1Phase,
        f1StateTimeLeft,
        startF1Sequence,
        addTrafficLightInstance,
        deleteTrafficLightInstance,
        addLight,
        updateLight,
        deleteLight,
        isLoading,
        instanceClicks,
      }}
    >
      {children}
    </TrafficLightsContext.Provider>
  );
};