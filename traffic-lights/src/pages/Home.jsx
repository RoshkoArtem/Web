import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] p-4 sm:p-8 text-left">
      <div className="w-full max-w-5xl bg-base-100/95 shadow-xl rounded-2xl p-6 sm:p-10 border border-base-300">
        <h1 className="text-3xl font-bold mb-2 text-center">Проєкт «Світлофори» — Labs 1-10</h1>
        <p className="text-center text-base-content/70 mb-8">
          Повний набір: компоненти, маршрутизація, анімація, Context API, Google Apps Script API, DaisyUI, F1-сторінка.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Link to="/horizontal" className="btn btn-sm btn-outline">Горизонтальні</Link>
          <Link to="/vertical" className="btn btn-sm btn-outline">Вертикальні</Link>
          <Link to="/settings" className="btn btn-sm btn-outline">Налаштування</Link>
          {isAuthenticated ? (
            <Link to="/f1-traffic-light" className="btn btn-sm btn-primary">Світлофор F1</Link>
          ) : (
            <Link to="/login" className="btn btn-sm btn-accent">Логін для F1</Link>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 1: Налаштування робочого середовища
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Навчитись налаштовувати робоче середовище для розробки, використовувати git, створювати базові проєкти за допомогою React (Vite) та оформлювати звіти.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 2: Початок роботи з React
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Створити компоненти Light і TrafficLights (горизонтальний/вертикальний варіанти). Передавати параметри через props. Використати PropTypes.</p>
              <div className="mt-4 flex gap-2">
                <Link to="/horizontal" className="btn btn-sm btn-outline">Горизонтальний</Link>
                <Link to="/vertical" className="btn btn-sm btn-outline">Вертикальний</Link>
              </div>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 3: Робота зі станом (State)
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Додати можливість підрахунку кліків по кожному кольору світлофора (робота з useState/events).</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 4: StatsBar та JSON дані
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Створити StatsBar, що показує загальну статистику кліків. Реалізувати "базу даних" світлофорів у форматі JSON масиву.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 5: Маршрутизація (React Router)
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Створити сторінки Home, ErrorPage, Horizontal/Vertical сторінки. Створити меню (Header) з роутами.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 6: Анімація
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Використати framer-motion для анімації натискання (моргання) та анімованого з'явлення світлофорів.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 7: Context API + JSON Server
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Перевести проєкт на TrafficLightsProvider. Зберігати статистику кліків в db.json за допомогою json-server.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 8: Google Apps Script API
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Підготувати скрипт googleapp.js для Google Sheets, який прийматиме кліки та оброблятиме авторизацію.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium flex justify-between items-center pr-10">
              Lab 9: DaisyUI
              <span className="badge badge-success shrink-0 ml-2">OK</span>
            </div>
            <div className="collapse-content"> 
              <p>Підключити DaisyUI та TailwindCSS і повністю застилізувати проєкт.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow border-2 border-primary bg-primary/5">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-bold text-primary flex justify-between items-center pr-10">
              Lab 10 (Іспит): Світлофор F1
              <Link to="/f1-traffic-light" className="btn btn-sm btn-primary z-10 shrink-0 ml-2">Перейти</Link>
            </div>
            <div className="collapse-content"> 
              <p className="font-semibold mb-2">Завдання:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Додати захищену сторінку (потрібен логін).</li>
                <li>Автоматична зміна кольорів.</li>
                <li>Світлофор F1 має вигляд реального світлофора Формули-1.</li>
                <li>Синхронізація: якщо авто-світлофор зелений, F1 блокується.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
