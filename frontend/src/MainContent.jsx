import React from 'react';
import NewPostButton from './NewPostButton';
import SearchBar from './SearchBar';
import PostList from './PostList';

function MainContent() {
  return (
    <div className="flex flex-col ml-5 w-[53%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 w-full max-md:max-w-full">
          <NewPostButton />
          <SearchBar />
        </div>
        <PostList />
      </div>
    </div>
  );
}

export default MainContent;