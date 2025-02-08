import React, { useState, useEffect } from 'react';
import Post from './Post';

const posts = [
  {
    title: "How to solve this math problem?",
    course: "15-266",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper massa quis velit mollis pretium. Sed imperdiet est lectus, eu rhoncus massa pharetra sed. Etiam fringilla tellus augue. Nam vitae enim vel felis tristique convallis ac a sapien. Duis vulputate purus lorem, nec congue sapien rutrum et. Quisque consectetur condimentum mollis. Praesent lobortis dictum lacus, vitae eleifend felis auctor ac. Fusce nisl eros, mollis eu sodales ac, commodo sit amet nunc. Ut vel euismod quam. Sed nec dolor erat. Nunc justo lectus, pharetra sed tincidunt in, dignissim nec ligula.",
    rank: 3,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b3e374cceeafb5f04d89304c4dd383bb26d981aee8771b0b90ab81a8503d288?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: true
  },
  {
    title: "Need help with 15-122 please!",
    course: "15-122",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper massa quis velit mollis pretium. Sed imperdiet est lectus, eu rhoncus massa pharetra sed. Etiam fringilla tellus augue. Nam vitae enim vel felis tristique convallis ac a sapien. Duis vulputate purus lorem, nec congue sapien rutrum et. Quisque consectetur condimentum mollis. Praesent lobortis dictum lacus, vitae eleifend felis auctor ac. Fusce nisl eros, mollis eu sodales ac, commodo sit amet nunc. Ut vel euismod quam. Sed nec dolor erat. Nunc justo lectus, pharetra sed tincidunt in, dignissim nec ligula.",
    rank: 3,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bea33da8d3d639f1caf38ef075b00df16fed6ad9a53b1635bbae3586414ca95?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: true
  },
  {
    title: "How to install this program?",
    course: "15-150",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper massa quis velit mollis pretium. Sed imperdiet est lectus, eu rhoncus massa pharetra sed. Etiam fringilla tellus augue. Nam vitae enim vel felis tristique convallis ac a sapien. Duis vulputate purus lorem, nec congue sapien rutrum et. Quisque consectetur condimentum mollis. Praesent lobortis dictum lacus, vitae eleifend felis auctor ac. Fusce nisl eros, mollis eu sodales ac, commodo sit amet nunc. Ut vel euismod quam. Sed nec dolor erat. Nunc justo lectus, pharetra sed tincidunt in, dignissim nec ligula.",
    rank: 2,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bea33da8d3d639f1caf38ef075b00df16fed6ad9a53b1635bbae3586414ca95?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: false
  },
  {
    title: "Help me with this question!",
    course: "15-266",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper massa quis velit mollis pretium. Sed imperdiet est lectus, eu rhoncus massa pharetra sed. Etiam fringilla tellus augue. Nam vitae enim vel felis tristique convallis ac a sapien. Duis vulputate purus lorem, nec congue sapien rutrum et. Quisque consectetur condimentum mollis. Praesent lobortis dictum lacus, vitae eleifend felis auctor ac. Fusce nisl eros, mollis eu sodales ac, commodo sit amet nunc. Ut vel euismod quam. Sed nec dolor erat. Nunc justo lectus, pharetra sed tincidunt in, dignissim nec ligula.",
    rank: 1,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bea33da8d3d639f1caf38ef075b00df16fed6ad9a53b1635bbae3586414ca95?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: false
  }
];

function PostList() {
  const [topPosts, setTopPosts] = useState([])
  useEffect(() => {
    fetch('/get_top')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("made it here")
        return response.json();
      })
      .then(data => setTopPosts(data))
      // .catch(error => console.error('Error fetching posts:', error));
  }, []);

  console.log(topPosts.length)
  return (
    <div className="flex flex-col px-5 pt-5 pb-16 mt-6 bg-white rounded-2xl shadow-[0px_1px_4px_rgba(0,0,0,0.25)] text-zinc-700 max-md:max-w-full">
      <div className="self-start text-lg font-bold tracking-normal leading-none">
        Recent posts
      </div>
      {/* {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))} */}
      {topPosts.length > 0 ? (
        topPosts.map(post => (
          <Post key={post.id} {...post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PostList;