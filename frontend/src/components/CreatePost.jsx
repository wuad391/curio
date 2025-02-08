import React, { useState, useEffect } from 'react';

function CreatePost() {
  // Form state variables
  const [selectedClass, setSelectedClass] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // Fetch available tags from your Flask backend (SQLAlchemy)
  useEffect(() => {
    fetch('/api/tags')
      .then(response => response.json())
      .then(data => setAvailableTags(data))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  // Handle adding a tag from the dropdown
  const handleAddTag = (e) => {
    const tagName = e.target.value;
    if (tagName && !selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  // Toggle the visibility of the tag dropdown
  const toggleTagDropdown = () => {
    setShowTagDropdown(!showTagDropdown);
  };

  // Handle form submission: send data to your Flask backend
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      class: selectedClass,
      title: title,
      content: content,
      rank: 0
    };

    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    }).then(response => {
        if (response.ok) {
          console.log('Post created successfully!');
          // Optionally reset the form or show a success message here.
        } else {
          console.error('Failed to create post.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const getLatestPosts = () => {
    fetch('/posts').then(response => {
      if (response.ok){
        return response.json()
      }
    }).then(data => setContent(data))
  }


  return (
    <div className="flex flex-col px-5 pt-5 pb-16 mt-6 bg-white rounded-2xl shadow-[0px_1px_4px_rgba(0,0,0,0.25)] text-zinc-700 max-md:max-w-full">
      <h2 className="text-3xl font-bold mb-6">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Class Dropdown */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Select Class
          </label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a class</option>
            <option value="15-122">15-122</option>
            <option value="15-150">15-150</option>
            <option value="15-266">15-266</option>
            <option value="15-251">15-251</option>
          </select>
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your post title"
          />
        </div>

        {/* Question/Text Input Area */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Question / Text
          </label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter the details of your post here"
          ></textarea>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex items-center space-x-3 mt-1">
            <button
              type="button"
              onClick={toggleTagDropdown}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Tag
            </button>
            {/* Display selected tags */}
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {showTagDropdown && (
            <select
              onChange={handleAddTag}
              value=""
              className="mt-2 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a tag</option>
              {availableTags.map((tag) => (
                // Assuming each tag object has "id" and "name"
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;