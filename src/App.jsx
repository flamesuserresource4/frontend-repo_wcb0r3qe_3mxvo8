import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import RoleSwitcher from './components/RoleSwitcher';
import CreateEventForm from './components/CreateEventForm';
import EventList from './components/EventList';

function App() {
  const [role, setRole] = useState('participant');

  useEffect(() => {
    const saved = localStorage.getItem('role');
    if (saved) setRole(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/40 text-gray-900">
      <Hero />

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">Your Event Hub</h2>
              <p className="text-gray-600">Switch roles to manage or join events with ease.</p>
            </div>
            <RoleSwitcher role={role} onChange={setRole} />
          </div>

          {role === 'committee' && (
            <CreateEventForm />
          )}

          <EventList role={role} />
        </div>
      </main>

      <footer className="mt-16 py-10 text-center text-sm text-gray-500">
        Built for effortless event experiences.
      </footer>
    </div>
  );
}

export default App;
