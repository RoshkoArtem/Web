import TrafficLights from '../components/TrafficLights';
import StatsBar from '../components/StatsBar';

const HorizontalPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Горизонтальний світлофор</h2>
      <TrafficLights orientation="horizontal" />
      <div className="w-full mt-10">
        <StatsBar />
      </div>
    </div>
  );
};

export default HorizontalPage;
