import React, { useState, useEffect } from 'react';

function CreatePost() {
    const [title, setTitle] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
    <div className="flex flex-col px-5 pt-5 pb-16 mt-6 bg-white rounded-2xl shadow-[0px_1px_4px_rgba(0,0,0,0.25)] text-zinc-700 max-md:max-w-full">
        <h2 className="text-3xl font-bold mb-6">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

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


        {/* Submit Button */}
        <div>
            <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
            Submit Post
            </button>
        </div>
        </form>
    </div>
    );
}

export default CreatePost