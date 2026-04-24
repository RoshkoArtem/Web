import TrafficLights from '../components/TrafficLights';
import StatsBar from '../components/StatsBar';

const VerticalPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Вертикальний світлофор</h2>
      <TrafficLights orientation="vertical" />
      <div className="w-full mt-10">
        <StatsBar />
      </div>
    </div>
  );
};

export default VerticalPage;
