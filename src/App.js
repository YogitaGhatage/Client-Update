import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import './responsive.css';
import Navbar from './Compents/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { Route, Routes } from 'react-router-dom';
import PublicSpace from './pages/PublicSpace/PublicSpace';
import Chat from './Compents/Chat/Chat';

function App() {
  const dispatch = useDispatch();
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());

    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setTimeOfDay('morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, [dispatch]);

  return (
    <div className={`App ${timeOfDay}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/public-space" element={<PublicSpace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AllRoutes />
        <Chat />
      </Router>
    </div>
  );
}

function NotFoundPage() {
  return <div>This is StackOverFlow WebSite</div>;
}

export default App;
