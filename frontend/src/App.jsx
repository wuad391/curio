import React, { useState, useEffect } from 'react'
import { Home, MessageSquare, Search, Star, Book, Plus, MessageCircle } from "lucide-react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import NewPost from './pages/NewPost.jsx';

// MAIN APP
const App = () => {
  return (


    // trying Bill's stuff
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App