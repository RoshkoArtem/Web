const Home = () => {
  return (
    <div className="hero bg-base-200 min-h-[50vh] rounded-xl">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Світлофор Лаби</h1>
          <p className="py-6">
            Це проєкт з прогресивним виконанням 10 лабораторних робіт на React: 
            від базових компонентів до Context API, роутингу, DaisyUI та захищених маршрутів.
          </p>
          <p className="text-lg font-semibold text-primary">
            Використовуйте меню зверху для навігації!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
