import React, { useState } from 'react'
import { Home, MessageSquare, Search, Star, Book, Plus, MessageCircle } from "lucide-react";


// side navigation bar
const SideNav = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 relative">
      {/* Title Above Navbar */}
      <h1 className="text-xl font-bold text-center mb-4">Study Hub</h1>

      {/* First Section */}
      <nav className="mb-6">
        <h2 className="text-gray-400 text-sm uppercase mb-2">Main</h2>
        <NavItem name="Dashboard" icon={<Home size={20} />} />
        <NavItem name="Messages" icon={<MessageSquare size={20} />} />
        <NavItem name="Favorites" icon={<Star size={20} />} />
      </nav>

      {/* Second Section */}
      <nav className="mb-6">
        <h2 className="text-gray-400 text-sm uppercase mb-2">Classes</h2>
        <NavItem name="Math 101" icon={<MessageSquare size={20} />} />
        <NavItem name="CS 150" icon={<MessageSquare size={20} />} />
        <NavItem name="History 201" icon={<MessageSquare size={20} />} />
      </nav>

      {/* Third Section */}
      <nav>
        <h2 className="text-gray-400 text-sm uppercase mb-2">Questions</h2>
        <NavItem name="Helpful" icon={<MessageCircle size={20} className="text-blue-400" />} />
        <NavItem name="Awaiting Response" icon={<MessageCircle size={20} className="text-red-400" />} />
        <NavItem name="My Questions" icon={<MessageCircle size={20} className="text-yellow-400" />} />
      </nav>
    </aside>
  );
};


// individual navigation items
const NavItem = ({ name, icon }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700">
      {icon}
      <span className="text-sm">{name}</span>
    </div>
  );
};

// new post button
const NewPostButton = ({ onClick }) => {
  return (
    <button 
      className="absolute top-4 left-[-140px] bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md transition"
      onClick={onClick} // Handles click events
    >
      <Plus size={20} />
      New Post
    </button>
  );
};

// search bar
const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="w-full bg-gray-900 p-4 flex items-center">
      <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};


// post

const Post = ({ title, question, answer, className }) => {
  const [rating, setRating] = useState(0); // Store rating (1-5)

  // Function to set rating when a star is clicked
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-4"> {/* Added mb-4 for spacing */}
      {/* Left Side: Title and Question/Answer */}
      <div className="flex-1">
        <span className="text-lg font-semibold">{title}</span>
        <div className="mt-2">
          <span className="font-medium">Q:</span> {question}
        </div>
        <p className="mt-1 text-gray-600">
          <span className="font-medium">A:</span> {answer}
        </p>
      </div>

      {/* Middle: Star Rating */}
      <div className="flex items-center mx-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
            }`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>

      {/* Right Side: Class Name */}
      <span className="text-gray-500 text-sm">{className}</span>
    </div>
  );
};

// recent posts (feed of recent posts)

const RecentPosts = () => {
  const posts = [
    {
      title: "Understanding Recursion",
      question: "Can someone explain how recursion works?",
      answer: "Recursion is when a function calls itself until it reaches a base case.",
      className: "CS 150",
    },
    {
      title: "Linear Algebra Proof Help",
      question: "How do I prove that a matrix is invertible?",
      answer: "A matrix is invertible if and only if its determinant is nonzero.",
      className: "Math 242",
    },
    {
      title: "Pointers in C",
      question: "Why do pointers in C sometimes cause segmentation faults?",
      answer: "Segmentation faults occur when accessing memory incorrectly, such as dereferencing NULL or uninitialized pointers.",
      className: "CS 101",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 flex-1">
      <h1 className="text-2xl font-semibold mb-4">Recent Posts</h1>
      <div className="space-y-4"> {/* Added spacing between posts */}
        {posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            question={post.question}
            answer={post.answer}
            className={post.className}
          />
        ))}
      </div>
    </div>
  );
};


// MAIN APP
const App = () => {
  const [test, setTest] = useState();

  useEffect(() =>{
    const fetchData = async() => {
      const res = await fetch("/test");
      const data = await res.json();
      if (data) {
        setTest(data);
      }
    };
  }, []);
  
  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <SideNav />
      <div>{ message }</div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar at the Top */}
        <SearchBar />

        {/* Recent Posts Section */}
        <RecentPosts />
      </div>
    </div>
  );
};

export default App