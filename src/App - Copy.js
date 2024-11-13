import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Student from './components/student';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
