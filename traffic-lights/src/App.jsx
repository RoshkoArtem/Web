import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrafficLightsProvider } from './context/TrafficLightsContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import HorizontalPage from './pages/HorizontalPage';
import VerticalPage from './pages/VerticalPage';
import ErrorPage from './pages/ErrorPage';
import F1TrafficLightPage from './pages/F1TrafficLightPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <TrafficLightsProvider>
        <Router>
          <div className="w-full max-w-[1500px] mx-auto p-4 flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex flex-col items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/horizontal" element={<HorizontalPage />} />
                <Route path="/vertical" element={<VerticalPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/f1-traffic-light" 
                  element={
                    <ProtectedRoute>
                      <F1TrafficLightPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TrafficLightsProvider>
    </AuthProvider>
  );
}

export default App;
