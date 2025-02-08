import React from 'react';
import NewPostButton from './NewPostButton';
import SearchBar from './SearchBar';
import PostList from './PostList';
// import { Sidebar } from 'lucide-react';
import Sidebar from './Sidebar'
import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main className="flex flex-row gap-5 ml-5 max-md:flex-col max-md:ml-0">
      {/* Sidebar Section */}
      <aside className="w-[20%] max-md:w-full pt-5">
        <div className="w-full">
          <Sidebar />
        </div>
      </aside>
      
      {/* Main Content Section */}
      <section className="flex flex-col w-[60%] max-md:w-full pt-5">
        <div className="flex flex-wrap gap-6 w-full">
          <NewPostButton />
          <SearchBar />
        </div>
        <PostList />
      </section>
      
      {/* User Profile Section */}
      <aside className="w-[20%] max-md:w-full pt-5 mr-5">
        <div className="w-full flex justify-center">
          <UserProfile />
        </div>
      </aside>
    </main>
  );
}

export default MainContent;