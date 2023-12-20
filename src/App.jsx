import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './userContext';
import './App.css';
import NotFound from './Helper/NotFound copy';
import Sorteio from './components/Sorteio';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Sorteio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}
