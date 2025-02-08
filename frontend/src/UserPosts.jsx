import React from 'react';

const userPosts = [
  {
    title: "What is the difference between a double and a float?",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6be2c19e31e546726fb39cb169c2520f6223c45d42e7407184bcdf84641a93c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: true
  },
  {
    title: "How do you print hello world in Java?",
    icon: "",
    isActive: true
  },
  {
    title: "How do you convert a regular expression into a DFA?",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6be2c19e31e546726fb39cb169c2520f6223c45d42e7407184bcdf84641a93c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: false
  },
  {
    title: "How do I get more sleep?",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6be2c19e31e546726fb39cb169c2520f6223c45d42e7407184bcdf84641a93c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404",
    isActive: false
  }
];

function UserPosts() {
  return (
    <>
      <div className="self-start mt-3.5 text-xs font-semibold tracking-normal leading-loose text-zinc-700">
        Your Posts
      </div>
      {userPosts.map((post, index) => (
        <div key={index} className={`flex gap-2 px-2.5 py-4 mt-${index === 0 ? '2' : '3'} text-xs font-bold leading-4 rounded-2xl border-2 border-solid ${post.isActive ? 'bg-blue-100 bg-opacity-30' : 'bg-slate-50'} border-neutral-300 border-opacity-40 text-zinc-700 max-md:mr-1.5`}>
          {post.icon && (
            <img
              loading="lazy"
              src={post.icon}
              className="object-contain shrink-0 my-auto w-5 aspect-square"
              alt=""
            />
          )}
          {!post.icon && <div className="flex shrink-0 self-start h-[26px] w-[21px]" />}
          <div>{post.title}</div>
        </div>
      ))}
    </>
  );
}

export default UserPosts;