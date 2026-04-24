import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-base-200 border border-base-300 rounded-2xl w-full">
      <h1 className="text-9xl font-black text-error">404</h1>
      <h2 className="text-3xl font-bold mt-4">Сторінку не знайдено</h2>
      <p className="mt-2 text-gray-500">Можливо, ви ввели неправильну адресу.</p>
      <Link to="/" className="btn btn-primary mt-6">Повернутись на головну</Link>
    </div>
  );
};

export default ErrorPage;
