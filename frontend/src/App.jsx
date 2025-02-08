import React, { useState, useEffect } from 'react'
import { Home, MessageSquare, Search, Star, Book, Plus, MessageCircle } from "lucide-react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import NewPost from './pages/NewPost.jsx';

// MAIN APP
const App = () => {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/test");
  //     const data = await res.json();
  //     if (data) {
  //       setMessage(data);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [topPosts, setTopPosts] = useState({})
  useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("/get_top");
        const data = await res.json();
        if (data) {
          console.log(data)
          setTopPosts(data);
        }
        console.log(data)
      }
    }, []);
    console.log(topPosts.length)
  return <div></div>;
  // return (

    // trying Bill's stuff
    // <main>
      <p>{topPosts }</p>
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </BrowserRouter> */}
    {/* </main> */}
  // );
};

export default App