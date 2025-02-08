import React, { useState } from 'react';

function CreatePost() {
  const [selectedClass, setSelectedClass] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      class: selectedClass,
      title: title,
      content: content,
      rank: 0
    };

    // Replace the URL with your Flask endpoint.
    fetch("http://127.0.0.1:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // If your Flask server is hosted on a different origin,
      // ensure CORS is enabled on the backend.
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (response.ok) {
          console.log("Post created successfully!");
          // Optionally, reset the form or show a success message here.
          setSelectedClass('');
          setTitle('');
          setContent('');
        } else {
          console.error("Failed to create post.");
        }
      })
      .catch(error => console.error("Error:", error));
  };

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
}

export default CreatePost;
